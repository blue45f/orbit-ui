/* ========================================================================
 * Style Utilities & Design Tokens
 * ======================================================================== */

/* Class name utilities (Tailwind) */
export * from './cn'

/* Design tokens */
export * from './tokens'

/* Types */
export * from './types'

/* ========================================================================
 * CSS Reset Utilities
 * ======================================================================== */

/** Base CSS reset styles */
const baseReset = {
  boxSizing: 'border-box' as const,
  margin: 0,
  padding: 0,
  border: 0,
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',
}

/** CSS reset object with element-specific resets for vanilla-extract */
export const reset = {
  /** Base reset for all elements */
  base: baseReset,

  /** Reset for div elements */
  div: {
    ...baseReset,
  },

  /** Reset for span elements */
  span: {
    ...baseReset,
  },

  /** Reset for label elements */
  label: {
    ...baseReset,
    display: 'inline-block',
  },

  /** Reset for fieldset elements */
  fieldset: {
    ...baseReset,
    minWidth: 0,
  },

  /** Reset for button elements */
  button: {
    ...baseReset,
    background: 'none',
    cursor: 'pointer',
    appearance: 'none' as const,
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  },

  /** Reset for input elements */
  input: {
    ...baseReset,
    appearance: 'none' as const,
    outline: 'none',
    background: 'transparent',
  },

  /** Reset for textarea elements */
  textarea: {
    ...baseReset,
    appearance: 'none' as const,
    outline: 'none',
    background: 'transparent',
    resize: 'none' as const,
  },

  /** Reset for ul/ol elements */
  list: {
    ...baseReset,
    listStyle: 'none',
  },

  /** Reset for anchor elements */
  a: {
    ...baseReset,
    textDecoration: 'none',
    color: 'inherit',
  },
}

/** Button-specific reset (legacy alias) */
export const buttonReset = reset.button

/** Input-specific reset (legacy alias) */
export const inputReset = reset.input

/* ========================================================================
 * Legacy Compatibility Layer
 * ======================================================================== */

export const vars = {
  ref: {
    spacing: {
      0: '0px',
      50: '2px',
      100: '4px',
      150: '6px',
      200: '8px',
      250: '10px',
      300: '12px',
      400: '16px',
      500: '20px',
      600: '24px',
      800: '32px',
      1000: '40px',
      1200: '48px',
      1600: '64px',
    },
    radius: {
      none: '0px',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      full: '9999px',
    },
  },
  sem: {
    color: {},
    textStyle: {},
    elevation: {
      level1: '100',
      level2: '200',
      level3: '300',
      level4: '400',
      level5: '500',
    },
  },
  com: {
    button: {},
    toggle: {},
    checkbox: {},
    radioButton: {},
    chip: {},
    badge: {},
    textField: {},
    secureField: {},
    dropdown: {},
    tabItem: {},
    tabGroup: {},
    alertDialog: {},
    toast: {},
    sheet: {},
    scrim: {},
    divider: {},
    listNode: {},
    appBar: {},
    pageIndicator: {},
    pageNumber: {},
    pageDots: {},
    indicatorBadge: {},
    text: {},
    scrollableTabGroup: {},
  },
}

/* Type exports */
export type Spacing = keyof typeof vars.ref.spacing
export type Radius = keyof typeof vars.ref.radius
