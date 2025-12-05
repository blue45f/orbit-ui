const VALID_CASES = [
  /* style - 기본 */
  {
    filename: 'Component.css.ts',
    code: `
      import { style } from 'vanilla-extract'

      export const body = style({
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
      })
    `,
  },

  /* style - vendor 프리픽스 */
  {
    filename: 'Component.css.ts',
    code: `
      export const body = style({
        WebkitTransition: 'none',
        MozTransition: 'none',
        msTransition: 'none',
        transition: 'none'
      })
    `,
  },

  /* recipe - base, variants, compoundVariants */
  {
    filename: 'Component.css.ts',
    code: `
    export const root = recipe({
      base: [
        coreStyles.shared.flexCenter,
      ],
      variants: {
        as: {
          a: coreStyles.reset.a,
          button: coreStyles.reset.button,
        },
      },
      compoundVariants: [
        {
          variants: {
            color: 'neutral',
            variant: 'outlined',
          },
          style: {
            color: '#181A1C',
          },
        },
      ],
    })
    `,
  },

  /* recipe - selectors 사용한 경우 */
  {
    filename: 'Component.css.ts',
    code: `
    const ACTIVE_ON_COLOR = 'rgba(0, 0, 0, 0.2)'
    const HOVER_ON_COLOR = 'rgba(0, 0, 0, 0.08)'

     export const root = recipe({
      base: [
        coreStyles.shared.flexCenter,
      ],
      selectors: {
        '&[data-disabled=false][data-loading=false]:hover::after': {
          background: HOVER_ON_COLOR,
        },
        '&[data-disabled=false][data-loading=false]:active::after': {
          background: ACTIVE_ON_COLOR,
        },
      },
    })
    `,
  },

  /* recipe - variant, variants의 키값인 경우 */
  {
    filename: 'Component.css.ts',
    code: `
      export const root = recipe({
        variants: {
          scale: {
            100: {
              padding: '0 12px',
              height: 32,
              fontSize: 14,
            },
            200: {
              padding: '0 16px',
              height: 40,
              fontSize: 14,
            },
            300: {
              padding: '0 24px',
              height: 48,
              fontSize: 16,
            },
            400: {
              padding: '0 32px',
              height: 56,
              fontSize: 18,
            },
          },
        },
      })
    `,
  },

  /* recipe - variant, variants의 키값인 경우 */
  {
    filename: 'Component.css.ts',
    code: `
      export const root = recipe({
        variant: {
          fill: {
            color: '#fff',
            selectors: {
              '&[data-disabled=false][data-loading=false]:hover::after': {
                background: HOVER_ON_COLOR,
              },
              '&[data-disabled=false][data-loading=false]:active::after': {
                background: ACTIVE_ON_COLOR,
              },
            },
          },
          outline: {
            outline: '1px solid \$\{color\}',
            outlineOffset: -1,
            color,
            selectors: {
              '&[data-disabled=false][data-loading=false]:hover::after': {
                background: HOVER_ON_WHITE,
              },
              '&[data-disabled=false][data-loading=false]:active::after': {
                background: ACTIVE_ON_WHITE,
              },
            },
          },
        },
      })
    `,
  },

  /* recipe - selectors 사용한 경우 */
  {
    filename: 'Component.css.ts',
    code: `
      import { recipe } from 'vanilla-extract'

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

  /* recipe - spread operator 사용한 경우 */
  {
    filename: 'Component.css.ts',
    code: `
    export const typography = recipe({
      variants: {
        color: { ...colorProperties, ...baseColorProperties },
      },
    })
    `,
  },

  /* keyframes */
  {
    filename: 'Component.css.ts',
    code: `
      import { keyframes } from 'vanilla-extract'

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
  VALID_CASES,
}
