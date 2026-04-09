# CLAUDE.md

This file provides guidance for AI assistants working with the Orbit UI codebase.

## Project Overview

Orbit UI (formerly Clay Kit) is a Figma-based React design system component library. It provides a 3-tier architecture: Base components (unstyled) -> Theme components (styled) -> Custom components (project extensions).

**Key Technologies:**
- React 18/19 with TypeScript 5.7+
- Tailwind CSS for core styling
- vanilla-extract for theme-layer CSS-in-JS
- Vite for building, Vitest for testing
- Storybook for component documentation
- pnpm workspaces

## Package Structure

```
orbit-ui/
├── packages/
│   ├── core/                    # @heejun-com/core - Base components (unstyled)
│   │   └── src/
│   │       ├── components/      # UI components
│   │       ├── libs/            # Hooks, utilities, core functions
│   │       └── styles/          # Tailwind utilities, design tokens
│   │
│   ├── theme-eclipse/             # @heejun-com/theme-eclipse - Eclipse theme
│   │   └── src/
│   │       ├── components/      # Themed component wrappers
│   │       ├── styles/          # vanilla-extract styles
│   │       └── server/          # Server components for Next.js
│   │
│   ├── icons/                   # @heejun-com/icons - SVG icon components
│   ├── vite-plugin/             # @orbit-ui/vite-plugin - CSS ordering plugins
│   ├── eslint-plugin/           # @orbit-ui/eslint-plugin - CSS property ordering
│   └── generator/               # @orbit-ui/generator - Component scaffolding
│
└── config/
    ├── tsconfig/                # Shared TypeScript configurations
    └── figma/                   # Figma integration tools
```

## Development Commands

```bash
pnpm install      # Install dependencies
pnpm dev          # Run Storybook dev server
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm test:watch   # Run tests in watch mode
pnpm typecheck    # TypeScript type checking
pnpm lint         # ESLint checks
pnpm lint:fix     # Auto-fix lint issues
pnpm gen          # Generate new component scaffolding
pnpm changeset    # Create a changeset for versioning
```

## Component File Structure

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx           # Main component
├── ComponentName.lib.tsx       # Internal context/hooks (if needed)
├── ComponentName.styles.ts     # Styles (for core: Tailwind, for themes: vanilla-extract)
├── ComponentName.stories.tsx   # Storybook stories
├── ComponentName.test.tsx      # Unit tests
└── index.ts                    # Exports
```

## Component Patterns

### Base Components (@heejun-com/core)

Base components are unstyled and use Tailwind CSS utilities:

```tsx
import { forwardRef } from 'react'
import { cn, stateClasses } from '../../styles'

export type ButtonProps = {
  disabled?: boolean
  theme?: Partial<ButtonTheme>  // Token overrides
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled = false, theme, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(buttonStyles({ disabled }))}
        style={theme}
        {...props}
      >
        {children}
      </button>
    )
  }
)
```

### Theme Components (@heejun-com/theme-eclipse)

Theme components wrap base components with styled tokens using vanilla-extract:

```tsx
import { forwardRef } from 'react'
import { Button as BaseButton } from '@heejun-com/core'
import { eclipseTokens } from '../../styles'

export const SolidButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', ...props }, ref) => (
    <BaseButton
      ref={ref}
      theme={{
        ...eclipseTokens.button,
        ...eclipseTokens.button.variant[variant],
      }}
      {...props}
    />
  )
)
```

### Compound Components

Many components use compound pattern with sub-components:

```tsx
<Button>
  <Button.Leading><IconPlus /></Button.Leading>
  <Button.Center>Add Item</Button.Center>
  <Button.Trailing><ChevronIcon /></Button.Trailing>
  <Button.Loading><Spinner /></Button.Loading>
</Button>
```

## Styling Conventions

### Core Package (Tailwind)

Use the `cn()` utility for class merging (clsx + tailwind-merge):

```tsx
import { cn, stateClasses, variants } from '../../styles'

// State-based classes
const buttonStyles = stateClasses({
  base: 'relative inline-flex items-center justify-center',
  enabled: 'cursor-pointer',
  disabled: 'cursor-not-allowed opacity-50',
  focused: 'ring-2 ring-blue-500',
})

// Variant-based classes
const sizeVariants = variants({
  base: 'px-4',
  variants: {
    size: {
      sm: 'py-1 text-sm',
      md: 'py-2 text-base',
      lg: 'py-3 text-lg',
    },
  },
})
```

### Theme Package (vanilla-extract)

Use vanilla-extract with recipes for themed styling:

```ts
import { recipe } from '@vanilla-extract/recipes'
import { vars } from '../styles/theme.css'

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.onPrimary,
      },
    },
  },
})
```

### CSS Property Ordering

CSS properties in `.css.ts` files should follow concentric ordering (enforced by `@orbit-ui/css-concentric-order`). Order: positioning -> display -> box model -> visual -> typography -> misc.

## Design Token Hierarchy

```
Reference Token → Semantic Token → Component Token
   (raw value)     (meaning)        (component-specific)

Example:
colorBlue500 → fillPrimary → buttonEnabledFill
```

Token files are in `packages/core/src/styles/tokens/`:
- `reference-token.ts` - Raw values (colors, spacing)
- `semantic-token.ts` - Meaning-based tokens
- `component-token.ts` - Component-specific tokens

## Testing

Tests use Vitest with React Testing Library:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })

  it('respects disabled state', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

Use custom `render` from test-utils which wraps with ThemeProvider.

## Accessibility

Components follow WAI-ARIA patterns:

- Use semantic HTML elements
- Include `aria-disabled`, `aria-pressed`, `aria-expanded` as needed
- Support keyboard navigation (Tab, Enter/Space, Arrow keys, Escape)
- Provide screen reader support with `aria-live` regions

## Commit Conventions

Format: `<type>(<scope>): <description>`

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code formatting
- `refactor` - Refactoring
- `test` - Tests
- `chore` - Build/config changes

Example: `feat(button): add loading state support`

## Versioning with Changesets

Before merging PRs, create a changeset:

```bash
pnpm changeset
```

1. Select affected packages
2. Choose version bump type (patch/minor/major)
3. Write change summary

## Build Output

Each package builds to `dist/`:

| Format | File | Use |
|--------|------|-----|
| ESM | `dist/index.js` | Modern bundlers |
| CJS | `dist/index.cjs` | Node.js |
| Types | `dist/index.d.ts` | TypeScript |
| CSS | `dist/style.css` | Styles |

## Important Conventions

1. **Use `forwardRef`** for all component root elements
2. **Export types** alongside components for TypeScript users
3. **Document with JSDoc** comments for complex components
4. **Theme prop** allows token overrides without CSS changes
5. **Compound components** use Context for state sharing
6. **Korean comments** are acceptable (bilingual codebase)
7. **Avoid `console.log`** - use `console.warn` or `console.error` only
8. **Prefix unused vars** with underscore: `_unusedVar`

## Pre-commit Checks

The project uses Husky with lint-staged:
- `.ts/.tsx` files: ESLint fix + Prettier
- `.json/.md` files: Prettier

## PR Checklist

Before submitting:
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds
- [ ] Changeset added if needed (`pnpm changeset`)
- [ ] Storybook stories added/updated for new components
