const fs = require('fs')
const { execSync } = require('child_process')

const replacements = [
  { from: /--sem-mint-/g, to: '--sem-eclipse-' },
  { from: /color="mint"/g, to: 'color="primary"' },
  { from: /color='mint'/g, to: "color='primary'" },
  { from: /color: 'mint'/g, to: "color: 'primary'" },
  { from: /color: "mint"/g, to: 'color: "primary"' },
  { from: /'mint' \| 'gray'/g, to: "'primary' | 'gray'" },
  { from: /'black' \| 'mint'/g, to: "'black' | 'primary'" },
  { from: /'mint' \| 'black'/g, to: "'primary' | 'black'" },
  { from: /\| 'mint'/g, to: "| 'primary'" },
  { from: /mint5/g, to: 'primary5' },
  { from: /value="mint"/g, to: 'value="primary"' },
  { from: /value='mint'/g, to: "value='primary'" },
  { from: /defaultValue='mint'/g, to: "defaultValue='primary'" },
  { from: />민트</g, to: '>기본<' },
  { from: />민트색 버튼</g, to: '>주요 버튼<' },
  { from: /Mint/g, to: 'Primary' },
  {
    from: /https:\/\/atelier-assets\.claykit\.com\/images\/mint\/[a-zA-Z0-9_@.]+/g,
    to: 'https://raw.githubusercontent.com/blue45f/ui-forge/main/packages/theme-eclipse/src/assets/media-placeholder.png',
  },
  { from: /샘플앱클럽/g, to: '프리미엄 멤버십' },
  { from: /bg-\[var\(--sem-color-fill-mint\)\]/g, to: 'bg-[var(--sem-color-fill-primary)]' },
  { from: /bg-\[var\(--sem-color-benefit-primary\)\]/g, to: 'bg-[var(--sem-color-primary)]' }, // Just in case
]

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    let changed = false

    replacements.forEach(({ from, to }) => {
      if (from.test(content)) {
        content = content.replace(from, to)
        changed = true
      }
    })

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8')
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

function processDirectory() {
  const files = execSync(
    `find packages -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.md" -o -name "*.mdx" \\) -not -path "*/node_modules/*" -not -path "*/dist/*"`,
    { encoding: 'utf-8' }
  )
    .split('\n')
    .filter(Boolean)

  let changedCount = 0
  files.forEach((file) => {
    if (replaceInFile(file)) {
      changedCount++
    }
  })
  console.log(`Changed ${changedCount} files to remove old brand references.`)
}

processDirectory()
