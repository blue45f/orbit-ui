<p align="center">
  <h1 align="center">Orbit UI</h1>
  <p align="center"><strong>3-Tier Headless Architecture 기반의 React 디자인 시스템</strong></p>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" /></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18%2F19-61dafb" alt="React" /></a>
</p>

---

## Overview

Orbit UI는 **Primitives → Core → Theme** 3계층 아키텍처를 기반으로 한 고성능 React 디자인 시스템입니다.

- **50+** 프로덕션 레디 컴포넌트
- **Headless** 설계로 스타일과 로직 완전 분리
- **WAI-ARIA** 접근성 표준 준수
- **Light/Dark** 테마 실시간 전환
- **TypeScript** 완전 타입 지원

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Theme Layer (@orbit-ui/theme-eclipse)          │  ← 사용자가 import
│  디자인 토큰이 적용된 완성된 컴포넌트              │
│  SolidButton, TextField, Modal, DataTable ...   │
├─────────────────────────────────────────────────┤
│  Core Layer (@orbit-ui/core)                    │  ← Headless
│  스타일 없는 기본 컴포넌트, 접근성/키보드/상태 로직 │
│  Button, TextField, Checkbox, Sheet ...         │
├─────────────────────────────────────────────────┤
│  Primitives (Internal)                          │  ← 내부 빌딩 블록
│  Layer, Slot, Animation, Presence, Portal ...   │
└─────────────────────────────────────────────────┘
```

### Layer System

Core 컴포넌트는 내부적으로 **Layer Primitive**를 사용하여 4개 레이어로 구성됩니다:

| Layer | 역할 |
|-------|------|
| `ContainerLayer` | 최외곽 래퍼, border-radius/shadow/padding 담당 |
| `StateLayer` | hover/press 상태의 시각 효과 오버레이 |
| `BorderLayer` | 테두리 렌더링 전용 레이어 |
| `ContentLayer` | 텍스트/아이콘 등 실제 콘텐츠 |

### Compound Component Pattern

```tsx
<SolidButton color="primary" size="medium">
  <SolidButton.Leading><PlusIcon /></SolidButton.Leading>
  <SolidButton.Center>새 항목 추가</SolidButton.Center>
  <SolidButton.Trailing><ChevronRightIcon /></SolidButton.Trailing>
</SolidButton>
```

### Design Token Hierarchy

```
Reference Token  →  Semantic Token  →  Component Token
  (blue500)         (fillPrimary)      (buttonEnabledFill)
```

토큰은 `EclipseProvider`의 CSS Variable로 동작하여 Light/Dark 모드에서 자동 전환됩니다.

---

## Packages

| Package | Description |
|---------|-------------|
| [`@orbit-ui/core`](./packages/core) | Headless 기본 컴포넌트 + Primitives (Layer, Slot, Animation) |
| [`@orbit-ui/theme-eclipse`](./packages/theme-eclipse) | Eclipse 테마 컴포넌트 (50+ components) |
| [`@orbit-ui/icons`](./packages/icons) | SVG 아이콘 라이브러리 |
| [`@orbit-ui/vite-plugin`](./packages/vite-plugin) | CSS 순서 최적화 Vite 플러그인 |
| [`@orbit-ui/eslint-plugin`](./packages/eslint-plugin) | CSS property 순서 린트 룰 |
| [`@orbit-ui/generator`](./packages/generator) | 컴포넌트 스캐폴딩 생성기 |

---

## Getting Started

### Installation

```bash
pnpm add @orbit-ui/theme-eclipse @orbit-ui/icons
```

### Setup

```tsx
import { EclipseProvider, SolidButton } from '@orbit-ui/theme-eclipse'
import '@orbit-ui/theme-eclipse/style.css'

function App() {
  return (
    <EclipseProvider mode="light" platform="pc">
      <SolidButton color="primary" size="medium">
        시작하기
      </SolidButton>
    </EclipseProvider>
  )
}
```

### EclipseProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'light' \| 'dark'` | `'light'` | 테마 모드 |
| `platform` | `'mobile' \| 'pc'` | `'mobile'` | 플랫폼 최적화 |
| `baseTextSize` | `'xSmall' \| 'small' \| 'medium' \| 'large' \| ...` | `'medium'` | 타이포그래피 스케일 |

### Next.js App Router (SSR)

```tsx
import { getTheme } from '@orbit-ui/theme-eclipse/server'
import '@orbit-ui/theme-eclipse/style.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={getTheme()}>{children}</body>
    </html>
  )
}
```

---

## Development

```bash
pnpm install      # Install dependencies
pnpm dev          # Storybook dev server
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm typecheck    # TypeScript check
pnpm lint         # ESLint
pnpm gen          # Generate component scaffold
```

---

## Documentation

Storybook에서 전체 문서를 확인할 수 있습니다:

- **소개** — 프로젝트 개요 및 설계 철학
- **시작하기** — 설치, 설정, 사용법
- **컴포넌트 개요** — 50+ 컴포넌트 카탈로그
- **디자인 토큰** — Reference → Semantic → Component 토큰 시스템
- **아키텍처** — 3-Tier 구조, Layer 시스템, Compound Pattern
- **테마 가이드** — Light/Dark 모드, EclipseProvider, Semantic Color Tokens

```bash
pnpm dev  # http://localhost:6007
```

---

## License

MIT License © 2026 Orbit UI Contributors
