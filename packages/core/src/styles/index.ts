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
