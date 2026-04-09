const tsNodePath =
  '/Users/hjunkim/WebstormProjects/orbit-ui/packages/theme-eclipse/node_modules/ts-node'
require(tsNodePath).register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS',
    esModuleInterop: true,
  },
})

const {
  referenceLightTheme,
  referenceDarkTheme,
} = require('/Users/hjunkim/WebstormProjects/orbit-ui/packages/core/src/styles/tokens/reference-token.ts')
const {
  semanticLightTheme,
  semanticDarkTheme,
} = require('/Users/hjunkim/WebstormProjects/orbit-ui/packages/theme-eclipse/src/styles/semantic-token.ts')
const {
  componentLightTheme,
  componentDarkTheme,
} = require('/Users/hjunkim/WebstormProjects/orbit-ui/packages/theme-eclipse/src/styles/component-token.ts')
const {
  xSmallTextStyleTheme,
  smallTextStyleTheme,
  mediumTextStyleTheme,
  largeTextStyleTheme,
  xLargeTextStyleTheme,
  xxLargeTextStyleTheme,
  xxxLargeTextStyleTheme,
} = require('/Users/hjunkim/WebstormProjects/orbit-ui/packages/theme-eclipse/src/styles/text-style-token.ts')

const fs = require('fs')

function generateVarBlock(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')
}

const lightCss = `.eclipse-light {\n${generateVarBlock({ ...referenceLightTheme, ...semanticLightTheme, ...componentLightTheme })}\n}`
const darkCss = `.eclipse-dark {\n${generateVarBlock({ ...referenceDarkTheme, ...semanticDarkTheme, ...componentDarkTheme })}\n}`

const textSizeCss = [
  { cls: 'text-size-xSmall', theme: xSmallTextStyleTheme },
  { cls: 'text-size-small', theme: smallTextStyleTheme },
  { cls: 'text-size-medium', theme: mediumTextStyleTheme },
  { cls: 'text-size-large', theme: largeTextStyleTheme },
  { cls: 'text-size-xLarge', theme: xLargeTextStyleTheme },
  { cls: 'text-size-xxLarge', theme: xxLargeTextStyleTheme },
  { cls: 'text-size-xxxLarge', theme: xxxLargeTextStyleTheme },
]
  .map(({ cls, theme }) => `.${cls} {\n${generateVarBlock(theme)}\n}`)
  .join('\n\n')

const fullCss = [lightCss, darkCss, textSizeCss].join('\n\n')
fs.writeFileSync('/tmp/theme.css', fullCss)
console.log('Generated', fullCss.split('\n').length, 'lines')
console.log(
  'Light vars total:',
  Object.keys(referenceLightTheme).length +
    Object.keys(semanticLightTheme).length +
    Object.keys(componentLightTheme).length
)
