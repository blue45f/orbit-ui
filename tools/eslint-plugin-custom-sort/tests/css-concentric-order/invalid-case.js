const INVALID_CASES = [
  /* style - MemberExpression, null, undefined */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
    export const box = style([
      coreStyles.shared.flexCenter,
      { backgroundColor: vars.color.fill.accent_primary, color: null, width: 250, height: undefined }
    ])
    `,
    output: `
    export const box = style([
      coreStyles.shared.flexCenter,
      { backgroundColor: vars.color.fill.accent_primary, width: 250, height: undefined, color: null }
    ])
    `,
  },

  /* style - single line width shorthand property */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
    export const body = style({ position: 'absolute', left, top })
    `,
    output: `
    export const body = style({ position: 'absolute', top, left })
    `,
  },

  /* style - vendor 프리픽스 */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
      export const body = style({
        MozTransition: 'none',
        transition: 'none',
        WebkitTransition: 'none',
        msTransition: 'none'
      })
    `,
    output: `
      export const body = style({
        WebkitTransition: 'none',
        MozTransition: 'none',
        msTransition: 'none',
        transition: 'none',
      })
    `,
  },

  /* style - 위아래 주석 사용 */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
    // 주석1
    export const inwrap = style({ position: 'relative', display: 'block' })
    // 주석2
    `,
    output: `
    // 주석1
    export const inwrap = style({ display: 'block', position: 'relative' })
    // 주석2
    `,
  },

  // /* style - 위아래, 오른쪽 주석 사용 */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: ` // 주석0
    export const inwrap2 = style({ // 주석1
      position: 'relative', // 주석2
      /**
       * 주석3
       */
      // 주석4
      display: 'block' // 주석5
    })`,
    output: ` // 주석0
    export const inwrap2 = style({ // 주석1
      /**
       * 주석3
       */
      // 주석4
      display: 'block', // 주석5
      position: 'relative', // 주석2
    })`,
  },

  /* style - 인자가 배열 */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
      export const root = style([
        styles.shared.fixedCenter,
          {
            width: 'fit-content',
            position: 'relative',
          },
        ]
      )
    `,
    output: `
      export const root = style([
        styles.shared.fixedCenter,
          {
            position: 'relative',
            width: 'fit-content',
          },
        ]
      )
    `,
  },

  /* recipe */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
      export const root = recipe({
        base: [
          coreStyles.shared.flexCenter,
          {
            userSelect: 'none',
            borderRadius: 4,
            boxSizing: 'border-box',
            display: 'inline-flex',
            overflow: 'hidden',
            position: 'relative',
            width: 'fit-content',
            selectors: {
              // 오버레이
              '&::after': {
                pointerEvents: 'none',
                height: '100%',
                content: '',
                display: 'block',
              },
              '&:not([aria-disabled=true])': {
                cursor: 'pointer',
              },
            },
          },
        ]
      })
    `,
    output: `
      export const root = recipe({
        base: [
          coreStyles.shared.flexCenter,
          {
            boxSizing: 'border-box',
            display: 'inline-flex',
            position: 'relative',
            borderRadius: 4,
            userSelect: 'none',
            width: 'fit-content',
            overflow: 'hidden',
            selectors: {
              // 오버레이
              '&::after': {
                content: '',
                display: 'block',
                pointerEvents: 'none',
                height: '100%',
              },
              '&:not([aria-disabled=true])': {
                cursor: 'pointer',
              },
            },
          },
        ]
      })
    `,
  },

  /* recipe - trailing comma 없는 곳이 여럿일 경우 */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
      export const typography = recipe({
        variants: {
          variant: {
            900: {
              fontSize: vars.fontSize['900'],
              lineHeight: vars.lineHeight['100']
            },
            800: {
              fontSize: vars.fontSize['800'],
              lineHeight: vars.lineHeight['100']
            },
          },
        },
      })
    `,
    output: `
      export const typography = recipe({
        variants: {
          variant: {
            900: {
              lineHeight: vars.lineHeight['100'],
              fontSize: vars.fontSize['900'],
            },
            800: {
              lineHeight: vars.lineHeight['100'],
              fontSize: vars.fontSize['800'],
            },
          },
        },
      })
    `,
  },

  /* keyframes */
  {
    filename: 'Component.css.ts',
    errors: [{ message: 'Sort in concentric order.' }],
    code: `
      const spin = keyframes({
        from: {
          opacity: 0,
          transform: 'rotate(0deg)',
        },
        to: {
          opacity: 1,
          transform: 'rotate(360deg)',
        },
      })
      `,
    output: `
      const spin = keyframes({
        from: {
          transform: 'rotate(0deg)',
          opacity: 0,
        },
        to: {
          transform: 'rotate(360deg)',
          opacity: 1,
        },
      })
      `,
  },
]

module.exports = {
  INVALID_CASES,
}
