const fs = require('fs')

const files = [
  'packages/theme-eclipse/src/components/SolidButton/SolidButton.stories.tsx',
  'packages/theme-eclipse/src/components/OutlineButton/OutlineButton.stories.tsx',
  'packages/theme-eclipse/src/components/GhostButton/GhostButton.stories.tsx',
]

files.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8')
    // For '전체너비' story specifically, replace `<Flex columnGap="8px" style={{ width: '400px' }}>`
    // with `<Flex flexDirection="column" gap="8px" style={{ width: '400px' }}>`
    content = content.replace(
      /<Flex columnGap="8px" style=\{\{ width: '400px' \}\}>/g,
      '<Flex flexDirection="column" gap="8px" style={{ width: \'400px\' }}>'
    )

    // Also fix any other flex directions where we want them column-wise but using columnGap.
    // Let's just fix the overall width one.
    fs.writeFileSync(file, content, 'utf-8')
    console.log(`Updated ${file}`)
  }
})
