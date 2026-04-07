const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const replacements = [
  { from: 'eclipseTokens', to: 'eclipseTokens' },
  { from: 'eclipse-theme', to: 'eclipse-theme' },
  { from: 'eclipse theme', to: 'eclipse theme' },
  { from: 'Eclipse Theme', to: 'Eclipse Theme' },
  { from: 'orbit-form', to: 'orbit-form' },
  { from: 'ORBIT_UI', to: 'ORBIT_UI' },
  { from: 'OrbitUI', to: 'OrbitUI' },
  { from: 'orbit-ui-eclipse', to: 'orbit-ui-eclipse' },
  { from: 'orbit-ui-core', to: 'orbit-ui-core' },
  { from: 'value="eclipse"', to: 'value="eclipse"' },
  { from: 'Eclipse', to: 'Eclipse' },
  { from: 'eclipse', to: 'eclipse' },
]

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    let changed = false

    replacements.forEach(({ from, to }) => {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      if (regex.test(content)) {
        content = content.replace(regex, to)
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
  try {
    const files = execSync(
      `find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.mdx" -o -name "*.cjs" -o -name "*.mjs" -o -name "*.yml" -o -name "*.yaml" -o -name "*.html" -o -name "*.sh" -o -name "*.hbs" -o -name "*.properties" \\) -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.turbo/*" -not -path "*/storybook-static/*" -not -path "*/.git/*"`,
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
    console.log(`Changed ${changedCount} files`)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

processDirectory()
