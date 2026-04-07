<p align="center">
  <img src="https://raw.githubusercontent.com/blue45f/ui-forge/main/packages/theme-eclipse/src/assets/media-placeholder.png" width="120" height="120" alt="Orbit UI Logo" />
  <h1 align="center">Orbit UI</h1>
</p>

<p align="center">
  <strong>The Sentient Design System for Modern React Applications (2026 Edition)</strong>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" /></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-61dafb" alt="React" /></a>
  <a href="https://github.com/blue45f/ui-forge"><img src="https://img.shields.io/badge/Docs-GitHub-black" alt="Official Docs" /></a>
</p>

---

## 🪐 Overview

**Orbit UI** is a high-performance, accessible, and AI-ready React design system. Built for the 2026 web ecosystem, it leverages **React 19 Server Components (RSC)**, **Radix UI Primitives**, and a modular 3-tier architecture to provide a seamless development experience across Mobile and Desktop platforms.

This is the **Official Documentation** repository. For live component playgrounds, visit our [Storybook Instance](http://localhost:6007).

---

## ✨ Key Features (2026 Modernized)

| Feature | Description |
|------|------|
| **AI-Ready Architecture** | Modular components designed for dynamic assembly and generative UI patterns. |
| **Server-First Design** | Fully optimized for React Server Components (RSC) and the React Compiler. |
| **Eclipse Theme** | A sophisticated visual language featuring glassmorphism, soft layered shadows, and tactile interactions. |
| **Platform Fluidity** | Native-like experience switching between Mobile and PC modes via `EclipseProvider`. |
| **Accessibility (A11y)** | Built on Radix UI, ensuring WAI-ARIA compliance out of the box. |
| **Zero Runtime Styling** | Blazingly fast styles powered by Tailwind CSS v4 and vanilla-extract. |

---

## 📦 Packages

| Package | Description |
|--------|------|
| [`@orbit-ui/core`](./packages/core) | Headless logic & accessible primitives (unstyled). |
| [`@orbit-ui/theme-eclipse`](./packages/theme-eclipse) | The official Eclipse theme with modern aesthetic. |
| [`@orbit-ui/icons`](./packages/icons) | Optimized SVG icon library. |

---

## 🚀 Getting Started

### Installation

```bash
pnpm add @orbit-ui/theme-eclipse
```

### Basic Usage

Wrap your application with `EclipseProvider` to enable theme tokens and platform-specific styling.

```tsx
import { SolidButton, EclipseProvider } from '@orbit-ui/theme-eclipse'
import '@orbit-ui/theme-eclipse/style.css'

function App() {
  return (
    <EclipseProvider mode="light" platform="pc">
      <SolidButton color="mint">Initialize System</SolidButton>
    </EclipseProvider>
  )
}
```

### Server Components (Next.js)

```tsx
// app/layout.tsx
import { EclipseProvider } from '@orbit-ui/theme-eclipse'
import '@orbit-ui/theme-eclipse/style.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EclipseProvider platform="mobile">{children}</EclipseProvider>
      </body>
    </html>
  )
}
```

---

## 🛠 Project Structure

```
orbit-ui/
├── packages/
│   ├── core/              # @orbit-ui/core - Headless Primitives
│   ├── theme-eclipse/     # @orbit-ui/theme-eclipse - Eclipse Design System
│   ├── icons/             # @orbit-ui/icons - Atomic Icons
│   ├── vite-plugin/       # Build-time optimization plugins
│   ├── eslint-plugin/     # Custom design system lint rules
│   └── generator/         # Plop-based component generator
└── docs/                  # Architectural guidelines
```

---

## 💻 Development

Orbit UI uses **pnpm workspaces** for efficient monorepo management.

```bash
pnpm install      # Install dependencies
pnpm dev          # Run Storybook development server
pnpm build        # Build all packages
pnpm test         # Run unit & visual regression tests
pnpm typecheck    # Static type checking
pnpm gen          # Generate new component boilerplate
```

---

## 📄 Documentation

The full documentation, including API references and design tokens, is maintained in this GitHub repository. 
- [Architecture Deep Dive](./docs/ARCHITECTURE.md)
- [Eclipse Design Tokens](./packages/theme-eclipse/DesignToken.mdx)
- [Component Overview](./packages/theme-eclipse/ComponentOverview.mdx)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for more details.

---

## ⚖️ License

MIT License © 2026 Orbit UI Contributors. Dedicated to building a more beautiful and accessible web.
