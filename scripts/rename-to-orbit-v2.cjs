const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const replacements = [
  { from: '@orbit-ui/core', to: '@orbit-ui/core' },
  { from: '@orbit-ui/theme-eclipse', to: '@orbit-ui/theme-eclipse' },
  { from: '@orbit-ui/icons', to: '@orbit-ui/icons' },
  { from: '@orbit-ui/theme-eclipse', to: '@orbit-ui/theme-eclipse' },
  { from: '@orbit-ui/theme-eclipse', to: '@orbit-ui/theme-eclipse' },
  { from: '@orbit-ui/core', to: '@orbit-ui/core' },
  { from: '@orbit-ui/icons', to: '@orbit-ui/icons' },
  { from: '@orbit-ui', to: '@orbit-ui' },
  { from: 'orbit-ui', to: 'orbit-ui' },
  { from: 'theme-eclipse', to: 'theme-eclipse' },
  { from: 'theme-eclipse', to: 'theme-eclipse' },
  { from: 'EclipseProvider', to: 'EclipseProvider' },
  { from: 'Eclipse 테마', to: 'Eclipse 테마' },
  { from: 'Eclipse 테마', to: 'Eclipse 테마' },
  { from: 'Orbit UI', to: 'Orbit UI' },
  { from: 'Orbit UI', to: 'Orbit UI' },
  { from: 'orbit-ui', to: 'orbit-ui' },
  { from: 'eclipse-', to: 'eclipse-' },
  { from: 'eclipse-', to: 'eclipse-' },
  { from: 'eclipse/', to: 'eclipse/' },
  { from: 'eclipse/', to: 'eclipse/' },
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
      `find . -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.mdx" -o -name "*.cjs" -o -name "*.mjs" -o -name "*.yml" -o -name "*.yaml" -o -name "*.html" -o -name "*.sh" -o -name "*.hbs" \\) -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.turbo/*" -not -path "*/storybook-static/*" -not -path "*/.git/*"`,
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
