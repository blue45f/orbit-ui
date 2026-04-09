import { referenceLightTheme, referenceDarkTheme } from './packages/core/src/styles/tokens/reference-token.ts';
import { semanticLightTheme, semanticDarkTheme } from './packages/theme-eclipse/src/styles/semantic-token.ts';
import { componentLightTheme, componentDarkTheme } from './packages/theme-eclipse/src/styles/component-token.ts';
import { xSmallTextStyleTheme, smallTextStyleTheme, mediumTextStyleTheme, largeTextStyleTheme, xLargeTextStyleTheme, xxLargeTextStyleTheme, xxxLargeTextStyleTheme } from './packages/theme-eclipse/src/styles/text-style-token.ts';
import { writeFileSync } from 'fs';

function generateVarBlock(obj: Record<string, string>): string {
  return Object.entries(obj).map(([k, v]) => `  ${k}: ${v};`).join('\n');
}

const lightCss = `.eclipse-light {\n${generateVarBlock({...referenceLightTheme as Record<string,string>, ...semanticLightTheme, ...componentLightTheme})}\n}`;
const darkCss = `.eclipse-dark {\n${generateVarBlock({...referenceDarkTheme as Record<string,string>, ...semanticDarkTheme, ...componentDarkTheme})}\n}`;

const textSizeCss = [
  { cls: 'text-size-xSmall', theme: xSmallTextStyleTheme },
  { cls: 'text-size-small', theme: smallTextStyleTheme },
  { cls: 'text-size-medium', theme: mediumTextStyleTheme },
  { cls: 'text-size-large', theme: largeTextStyleTheme },
  { cls: 'text-size-xLarge', theme: xLargeTextStyleTheme },
  { cls: 'text-size-xxLarge', theme: xxLargeTextStyleTheme },
  { cls: 'text-size-xxxLarge', theme: xxxLargeTextStyleTheme },
].map(({ cls, theme }) => `.${cls} {\n${generateVarBlock(theme as Record<string, string>)}\n}`).join('\n\n');

const fullCss = [lightCss, darkCss, textSizeCss].join('\n\n');
writeFileSync('/tmp/theme.css', fullCss);
console.log('Generated', fullCss.split('\n').length, 'lines');
