/**
 * revised from {@link https://github.com/brandon-rhodes/Concentric-CSS/blob/master/style3.css Concentric-CSS}
 */
const CONCENTRIC_CSS = [
  /* vanilla-extract - recipe */
  'base',
  'variants',
  'compoundVariants',

  /* vanilla-extract - variants */
  'as',

  /* vanilla-extract - compound variants */
  'defaultVariants',
  'variants',
  'style',

  /* all */
  'all',

  /* content - 원래 font 직후에 배치되야 맞지만, 파트원 투표로 위치 변경 */
  'content',
  'quotes',

  /* box-sizing */
  'box-sizing',

  /* position */
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',

  /* float */
  'float',
  'clear',

  /* flex */
  'flex',
  'flex-basis',
  'flex-direction',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',

  /* grid */
  'grid',
  'grid-area',
  'grid-template',
  'grid-template-areas',
  'grid-template-rows',
  'grid-template-columns',
  'grid-row',
  'grid-row-start',
  'grid-row-end',
  'grid-column',
  'grid-column-start',
  'grid-column-end',
  'grid-auto-rows',
  'grid-auto-columns',
  'grid-auto-flow',
  'grid-gap',
  'grid-row-gap',
  'grid-column-gap',

  /* align-content */
  'align-content',
  'align-items',
  'align-self',

  /* justify-content */
  'justify-content',
  'justify-items',
  'justify-self',

  /* order */
  'order',

  /* columns */
  'columns',
  'column-gap',
  'column-fill',
  'column-rule',
  'column-rule-width',
  'column-rule-style',
  'column-rule-color',
  'column-span',
  'column-count',
  'column-width',

  /* transform */
  'backface-visibility',
  'perspective',
  'perspective-origin',
  'transform',
  'transform-origin',
  'transform-style',

  /* transitions */
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',

  /* visibility */
  'visibility',
  'opacity',
  'z-index',

  /* margin */
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',

  /* outline */
  'outline',
  'outline-offset',
  'outline-width',
  'outline-style',
  'outline-color',

  /* border */
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-width',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',

  /* border-style */
  'border-style',
  'border-top-style',
  'border-right-style',
  'border-bottom-style',
  'border-left-style',

  /* border-radius */
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',

  /* border-color */
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',

  /* border-image */
  'border-image',
  'border-image-source',
  'border-image-width',
  'border-image-outset',
  'border-image-repeat',
  'border-image-slice',

  /* box-shadow */
  'box-shadow',

  /* background */
  'background',
  'background-attachment',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',

  /* cursor */
  'cursor',
  'user-select',
  'user-drag',
  'pointer-events',

  /* padding */
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',

  /* width */
  'width',
  'min-width',
  'max-width',

  /* height */
  'height',
  'min-height',
  'max-height',

  /* overflow */
  'overflow',
  'overflow-x',
  'overflow-y',
  'resize',

  /* list-style */
  'list-style',
  'list-style-type',
  'list-style-position',
  'list-style-image',
  'caption-side',

  /* tables */
  'table-layout',
  'border-collapse',
  'border-spacing',
  'empty-cells',

  /* animation */
  'animation',
  'animation-name',
  'animation-duration',
  'animation-timing-function',
  'animation-delay',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
  'animation-play-state',

  /* vertical-alignment */
  'vertical-align',

  /* text-alignment & decoration */
  'direction',
  'tab-size',
  'text-align',
  'text-align-last',
  'text-justify',
  'text-indent',
  'text-transform',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'text-underline-offset',
  'text-underline-position',

  'text-rendering',
  'text-shadow',
  'text-overflow',
  'text-emphasis',
  'text-emphasis-style',
  'text-emphasis-color',

  /* text-spacing */
  'line-height',
  'word-spacing',
  'letter-spacing',
  'white-space',
  'word-break',
  'word-wrap',

  /* font */
  'font',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-weight',
  'font-smoothing',
  'osx-font-smoothing',
  'font-variant',
  'font-style',
  'color',

  /* counters */
  'counter-reset',
  'counter-increment',

  /* breaks */
  'page-break-before' /* [NOTE]: to be changed for <tt>break-[before|after]</tt> */,
  'page-break-after',
  'page-break-inside',
]

module.exports = {
  CONCENTRIC_CSS,
}
