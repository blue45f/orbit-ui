import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const packageJsonPath = `${ROOT}/package.json`
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, `utf8`))
const scripts = pkg.scripts || {}

const requiredPaths = ['README.md', 'docs/ARCHITECTURE.md', 'docs/DEVELOPMENT.md', 'package.json']

const requiredScripts = ['verify', 'ci']

const missing = []
for (const file of requiredPaths) {
  if (!fs.existsSync(`${ROOT}/${file}`)) {
    missing.push(`file://${file}`)
  }
}

for (const script of requiredScripts) {
  if (!scripts[script]) {
    missing.push(`script://${script}`)
  }
}

if (pkg.workspaces) {
  const hasApps = fs.existsSync(`${ROOT}/apps`)
  const hasPackages = fs.existsSync(`${ROOT}/packages`)
  if (!hasApps && !hasPackages) {
    missing.push('workspace-structure')
  }
}

/* ════════════════════════════════════════════════════════════════════════
 * 추가 검사 1: 계층 경계 (tier boundary)
 *
 * core(@heejun-com/core)는 3계층 아키텍처의 최하위 계층이므로
 * 상위 계층인 theme-*(@heejun-com/theme-*)를 import 해서는 안 된다.
 * JSDoc @example 안의 import 예시는 위반이 아니므로 주석을 제거한 뒤 검사한다.
 * ════════════════════════════════════════════════════════════════════════ */

const tierViolations = []

function walkFiles(dir, predicate, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue
      walkFiles(full, predicate, acc)
    } else if (predicate(entry.name)) {
      acc.push(full)
    }
  }
  return acc
}

/** 주석(블록/라인)을 제거해 실제 코드만 남긴다. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '') // /* ... */ (JSDoc 포함)
    .replace(/(^|[^:])\/\/.*$/gm, '$1') // // ... (URL 의 // 는 제외)
}

const CORE_SRC = `${ROOT}/packages/core/src`
const THEME_IMPORT_RE =
  /(?:import|export)\s[^'"]*?\bfrom\s*['"]@heejun-com\/theme-[^'"]+['"]|(?:require|import)\(\s*['"]@heejun-com\/theme-[^'"]+['"]\s*\)/

const coreSourceFiles = walkFiles(CORE_SRC, (name) => /\.(ts|tsx|mts|cts)$/.test(name))
for (const file of coreSourceFiles) {
  const code = stripComments(fs.readFileSync(file, 'utf8'))
  if (THEME_IMPORT_RE.test(code)) {
    tierViolations.push(path.relative(ROOT, file))
  }
}

/* ════════════════════════════════════════════════════════════════════════
 * 추가 검사 2: 다크 토큰 패리티 (dark-token parity)
 *
 * theme-eclipse 의 theme.css 가 emit 하는 모든 --sem-eclipse-* 토큰은
 * 라이트(.eclipse-light)와 다크(.eclipse-dark) 양쪽에 모두 정의돼야 한다.
 * (한쪽에만 있으면 모드 전환 시 토큰이 누락된다.)
 * ════════════════════════════════════════════════════════════════════════ */

const tokenParityIssues = []
const THEME_CSS = `${ROOT}/packages/theme-eclipse/src/styles/theme.css`

/** CSS 텍스트에서 `<selector> { ... }` 블록 본문을 추출한다. */
function extractBlock(css, selector) {
  const start = css.indexOf(selector)
  if (start === -1) return null
  const braceStart = css.indexOf('{', start)
  if (braceStart === -1) return null

  let depth = 0
  for (let i = braceStart; i < css.length; i += 1) {
    const ch = css[i]
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return css.slice(braceStart + 1, i)
    }
  }
  return null
}

/** 블록 본문에서 정의된 --sem-eclipse-* 커스텀 프로퍼티 이름 집합을 뽑는다. */
function semEclipseTokens(blockBody) {
  const set = new Set()
  if (!blockBody) return set
  const re = /(--sem-eclipse-[a-zA-Z0-9-]+)\s*:/g
  let match
  while ((match = re.exec(blockBody)) !== null) {
    set.add(match[1])
  }
  return set
}

if (!fs.existsSync(THEME_CSS)) {
  tokenParityIssues.push(`theme.css not found at ${path.relative(ROOT, THEME_CSS)}`)
} else {
  const css = fs.readFileSync(THEME_CSS, 'utf8')
  const lightTokens = semEclipseTokens(extractBlock(css, '.eclipse-light'))
  const darkTokens = semEclipseTokens(extractBlock(css, '.eclipse-dark'))

  if (lightTokens.size === 0) {
    tokenParityIssues.push('no --sem-eclipse-* tokens found in .eclipse-light block')
  }

  const missingInDark = [...lightTokens].filter((t) => !darkTokens.has(t)).sort()
  const missingInLight = [...darkTokens].filter((t) => !lightTokens.has(t)).sort()

  for (const token of missingInDark) {
    tokenParityIssues.push(`${token}: defined for light but missing dark counterpart`)
  }
  for (const token of missingInLight) {
    tokenParityIssues.push(`${token}: defined for dark but missing light counterpart`)
  }
}

/* ════════════════════════════════════════════════════════════════════════
 * 결과 집계
 * ════════════════════════════════════════════════════════════════════════ */

let failed = false

if (missing.length > 0) {
  failed = true
  console.error(`architecture validation failed: ${missing.length} required-asset issue(s)`)
  for (const item of missing) {
    console.error(` - missing: ${item}`)
  }
}

if (tierViolations.length > 0) {
  failed = true
  console.error(
    `tier-boundary violation: core must not import from @heejun-com/theme-* (${tierViolations.length})`
  )
  for (const item of tierViolations) {
    console.error(` - ${item}`)
  }
}

if (tokenParityIssues.length > 0) {
  failed = true
  console.error(`dark-token parity violation: ${tokenParityIssues.length} issue(s)`)
  for (const item of tokenParityIssues) {
    console.error(` - ${item}`)
  }
}

if (failed) {
  process.exit(1)
}

console.log(
  `architecture validation passed: required assets present, ` +
    `tier boundary intact (${coreSourceFiles.length} core files scanned), ` +
    `dark-token parity OK`
)
