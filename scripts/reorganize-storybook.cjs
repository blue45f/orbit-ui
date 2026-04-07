const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const categoryMap = {
  // Forms & Inputs
  Button: 'Inputs',
  GhostButton: 'Inputs',
  OutlineButton: 'Inputs',
  OutlineIconButton: 'Inputs',
  SolidButton: 'Inputs',
  SolidIconButton: 'Inputs',
  TextField: 'Inputs',
  FloatingTextField: 'Inputs',
  PasswordField: 'Inputs',
  SearchBar: 'Inputs',
  TextArea: 'Inputs',
  Checkbox: 'Inputs',
  BoxedCheckbox: 'Inputs',
  CheckboxWithLabel: 'Inputs',
  BoxedCheckboxWithLabel: 'Inputs',
  RadioButton: 'Inputs',
  RadioButtonWithLabel: 'Inputs',
  RadioGroup: 'Inputs',
  Calendar: 'Inputs',
  Toggle: 'Inputs',
  Dropdown: 'Inputs',
  SegmentedControl: 'Inputs',

  // Feedback & Overlay
  Alert: 'Feedback',
  Modal: 'Feedback',
  Dialog: 'Feedback',
  Toast: 'Feedback',
  Popover: 'Feedback',
  Tooltip: 'Feedback',
  Loading: 'Feedback',

  // Navigation
  Tabs: 'Navigation',
  TabItem: 'Navigation',
  TabGroup: 'Navigation',
  ScrollableTabGroup: 'Navigation',
  AppBar: 'Navigation',
  Breadcrumb: 'Navigation',

  // Data Display
  Badge: 'Data Display',
  AnimatedBadge: 'Data Display',
  CounterBadge: 'Data Display',
  LabelBadge: 'Data Display',
  SpeechBadge: 'Data Display',
  Chip: 'Data Display',
  ChipLink: 'Data Display',
  Text: 'Data Display',
  SectionTitle: 'Data Display',
  ListTile: 'Data Display',
  Combination: 'Data Display',
  Avatar: 'Data Display',

  // Layout
  Divider: 'Layout',
  Space: 'Layout',
  Flex: 'Layout',

  // Primitives / Indicators
  PageDots: 'Indicators',
  PageIndicator: 'Indicators',
  PageNumber: 'Indicators',
  Skeleton: 'Indicators',
  Progress: 'Indicators',
  Slider: 'Inputs',
  Switch: 'Inputs',
  Layer: 'Primitives',
  Animation: 'Primitives',
  Spinner: 'Primitives',
  IconCatalog: 'Documentation',
  ImageCatalog: 'Documentation',
}

function processDirectory() {
  const files = execSync(
    `find packages/theme-eclipse/src packages/core/src -name "*.stories.tsx"`,
    { encoding: 'utf-8' }
  )
    .split('\n')
    .filter(Boolean)

  files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf-8')
    const basename = path.basename(file, '.stories.tsx')

    const category = categoryMap[basename] || 'Uncategorized'

    // Replace 'eclipse/...' -> 'eclipse/Category/...'
    // And 'core/...' -> 'core/Category/...'
    const regexNova = /title:\s*'eclipse\/([^']+)'/
    const regexCore = /title:\s*'core\/([^']+)'/

    if (regexNova.test(content)) {
      const match = content.match(regexNova)[1]
      // Avoid double category if it already has one
      if (!match.includes('/')) {
        content = content.replace(regexNova, `title: 'eclipse/${category}/${match}'`)
        fs.writeFileSync(file, content, 'utf-8')
      }
    }

    if (regexCore.test(content)) {
      const match = content.match(regexCore)[1]
      if (!match.includes('/')) {
        content = content.replace(regexCore, `title: 'core/${category}/${match}'`)
        fs.writeFileSync(file, content, 'utf-8')
      }
    }
  })
  console.log('Storybook files reorganized!')
}

processDirectory()
