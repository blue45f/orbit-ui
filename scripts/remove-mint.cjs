const fs = require('fs')
const { execSync } = require('child_process')

const replacements = [
  { from: /--com-mint-/g, to: '--com-eclipse-' },
  { from: /--ref-color-mint/g, to: '--ref-color-primary' },
  { from: /readonly mint:/g, to: 'readonly primary:' },
  { from: / mint:/g, to: ' primary:' },
  { from: /\{mint:/g, to: '{primary:' },
  { from: /\.mint\b/g, to: '.primary' },
  { from: /'mint'/g, to: "'primary'" },
  { from: /"mint"/g, to: '"primary"' },
  { from: /mint4/g, to: 'primary4' },
  { from: /mint5/g, to: 'primary5' },
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
  console.log(`Changed ${changedCount} files to remove 'mint' references.`)
}

processDirectory()
