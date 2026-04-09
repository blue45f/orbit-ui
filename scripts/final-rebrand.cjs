const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const replacements = [
  { from: '@orbit-ui/core', to: '@orbit-ui/core' },
  { from: '@orbit-ui/theme-eclipse', to: '@orbit-ui/theme-eclipse' },
  { from: '@orbit-ui/icons', to: '@orbit-ui/icons' },
  { from: '@orbit-ui/vite-plugin', to: '@orbit-ui/vite-plugin' },
  { from: '@orbit-ui/eslint-plugin', to: '@orbit-ui/eslint-plugin' },
  { from: '@orbit-ui/generator', to: '@orbit-ui/generator' },
  { from: 'packages/theme-eclipse/', to: 'packages/theme-eclipse/' },
  { from: 'theme-eclipse/src/', to: 'theme-eclipse/src/' },
  { from: '@orbit-ui/core', to: '@orbit-ui/core' },
  { from: 'orbit-ui', to: 'orbit-ui' },
  { from: 'orbit-ui', to: 'orbit-ui' },
  { from: 'Orbit UI', to: 'Orbit UI' },
  { from: 'Orbit UI', to: 'Orbit UI' },
]

function walkDir(dir) {
  const files = execSync(
    `find ${dir} -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" -o -name "*.mdx" -o -name "*.cjs" -o -name "*.mjs" -o -name "*.sh" -o -name "*.hbs" -o -name ".cursorrules" \\) -not -path "*/node_modules/*" -not -path "*/dist/*" -not -path "*/.turbo/*" -not -path "*/storybook-static/*" -not -path "*/.git/*"`,
    { encoding: 'utf-8' }
  )
    .split('\n')
    .filter(Boolean)

  files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf-8')
    let changed = false
    replacements.forEach(({ from, to }) => {
      const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
      if (regex.test(content)) {
        content = content.replace(regex, to)
        changed = true
      }
    })
    if (changed) {
      fs.writeFileSync(file, content, 'utf-8')
    }
  })
}

walkDir('.')
console.log('Final rebranding cleanup complete.')
