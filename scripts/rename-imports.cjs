/**
 * Script to rename all imports from @clay-kit to @orbit-ui
 * and mold to composites
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const replacements = [
  { from: '@orbit-ui/core', to: '@orbit-ui/core' },
  { from: '@orbit-ui/theme-eclipse', to: '@orbit-ui/theme-eclipse' },
  { from: '@orbit-ui/icons', to: '@orbit-ui/icons' },
  { from: '@clay-kit/tsconfig', to: '@orbit-ui/tsconfig' },
  { from: '@clay-kit/vite-plugin', to: '@orbit-ui/vite-plugin' },
  { from: '@clay-kit', to: '@orbit-ui' },
  { from: '/mold', to: '/composites' },
  { from: "'mold'", to: "'composites'" },
  { from: '"mold"', to: '"composites"' },
  { from: 'Clay Kit', to: 'UI Forge' },
  { from: 'clay-kit', to: 'orbit-ui' },
]

const directories = ['packages/theme-eclipse/src', 'packages/core/src', 'packages/icons/src']

function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8')
    let changed = false

    replacements.forEach(({ from, to }) => {
      if (content.includes(from)) {
        content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to)
        changed = true
      }
    })

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8')
      console.log(`✓ ${filePath}`)
      return true
    }
    return false
  } catch (error) {
    console.error(`✗ ${filePath}: ${error.message}`)
    return false
  }
}

function processDirectory(dir) {
  const baseDir = path.join(__dirname, '..', dir)

  try {
    // Find all .ts, .tsx, .js, .jsx, .json files
    const files = execSync(
      `find "${baseDir}" -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" \\)`,
      { encoding: 'utf-8' }
    )
      .split('\n')
      .filter(Boolean)

    console.log(`\nProcessing ${dir} (${files.length} files)...`)

    let changedCount = 0
    files.forEach((file) => {
      if (replaceInFile(file)) {
        changedCount++
      }
    })

    console.log(`Changed ${changedCount} files in ${dir}`)
    return changedCount
  } catch (error) {
    console.error(`Error processing ${dir}:`, error.message)
    return 0
  }
}

console.log('🔄 Renaming imports from @clay-kit to @orbit-ui...\n')

let totalChanged = 0
directories.forEach((dir) => {
  totalChanged += processDirectory(dir)
})

console.log(`\n✨ Total: ${totalChanged} files changed`)
