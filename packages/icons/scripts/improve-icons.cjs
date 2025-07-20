/**
 * Script to improve icon component code quality
 */

const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../src/icons');

function improveIconFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.tsx');

  // Skip if not an icon file or if already improved
  if (!fileName.endsWith('Icon') || content.includes('memo(')) {
    return false;
  }

  // Remove template comments (lines 4-25)
  content = content.replace(
    /\/\*\*\s*\n\s*\* 템플릿 기반으로 자동 생성된 컴포넌트입니다.*?\*\/\n/s,
    ''
  );

  // Extract component name
  const componentMatch = content.match(/export const (\w+):/);
  if (!componentMatch) {
    return false;
  }
  const componentName = componentMatch[1];

  // Check if has colorParts
  const hasColorParts = content.includes('colorParts');

  // Extract IconProps type
  const propsTypeMatch = content.match(/: React\.FC<(IconProps[^>]*)>/);
  const propsType = propsTypeMatch ? propsTypeMatch[1] : 'IconProps';

  // Replace React.FC with function declaration
  if (hasColorParts) {
    content = content.replace(
      /export const (\w+): React\.FC<([^>]+)> = \(\{ colorParts, \.\.\.rest \}\) => \(/,
      `function $1({ colorParts, ...props }: $2) {\n  return (`
    );
  } else {
    content = content.replace(
      /export const (\w+): React\.FC<([^>]+)> = \(props\) => \(/,
      `function $1(props: $2) {\n  return (`
    );
  }

  // Close function properly
  content = content.replace(/\)\n$/, '  )\n}\n');

  // Add memo import
  content = content.replace(
    /import \{ IconRoot \} from '\.\.\/IconRoot'/,
    "import { memo } from 'react'\nimport { IconRoot } from '../IconRoot'"
  );

  // Update props spreading in IconRoot
  if (hasColorParts) {
    content = content.replace(
      /<IconRoot \{\.\.\.rest\}>/g,
      '<IconRoot {...props}>'
    );
  }

  // Add displayName and memo export at the end
  content = content.replace(
    /\}\n$/,
    `}\n\n${componentName}.displayName = '${componentName}'\n\nexport default memo(${componentName})\nexport { ${componentName} }\n`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

// Process all icon files
const files = fs.readdirSync(ICONS_DIR);
const iconFiles = files.filter(file => file.endsWith('.tsx') && file !== 'index.tsx');

console.log(`Found ${iconFiles.length} icon files\n`);

let improvedCount = 0;
iconFiles.forEach(file => {
  const filePath = path.join(ICONS_DIR, file);
  try {
    if (improveIconFile(filePath)) {
      improvedCount++;
      console.log(`✓ ${file}`);
    }
  } catch (error) {
    console.error(`✗ ${file}:`, error.message);
  }
});

console.log(`\n✨ Improved ${improvedCount} files!`);
