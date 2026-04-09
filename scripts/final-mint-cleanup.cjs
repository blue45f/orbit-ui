const fs = require('fs')

const replacements = [
  {
    file: 'packages/core/src/styles/tokens/reference-token.ts',
    from: /mint(\d):/g,
    to: 'primary$1:',
  },
  {
    file: 'packages/core/src/styles/types.ts',
    from: /'mint\$\{string\}'/g,
    to: "'primary${string}'",
  },
  { file: 'config/figma/meta.json', from: /"mint"/g, to: '"eclipse"' },
  { file: 'config/figma/index.mjs', from: /'mint'/g, to: "'eclipse'" },
  { file: 'docs/ARCHITECTURE.md', from: /mint/g, to: 'eclipse' },
]

replacements.forEach(({ file, from, to }) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8')
    content = content.replace(from, to)
    fs.writeFileSync(file, content, 'utf-8')
  }
})
console.log('Final mint cleanup complete.')
