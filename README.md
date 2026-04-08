<p align="center">
  <img src="https://placehold.co/120x120/0f172a/ffffff.png?text=Orbit+UI&font=Inter" width="120" height="120" alt="Orbit UI Logo" />
  <h1 align="center">Orbit UI</h1>
</p>

<p align="center">
  <strong>현대적인 React 애플리케이션을 위한 2026년형 디자인 시스템 프레임워크</strong>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" /></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-61dafb" alt="React" /></a>
  <a href="https://github.com/blue45f/ui-forge"><img src="https://img.shields.io/badge/Docs-GitHub-black" alt="Official Docs" /></a>
</p>

---

## 🪐 개요 (Overview)

**Orbit UI**는 접근성이 뛰어나고 퍼포먼스가 우수한 고성능 React 디자인 시스템입니다. 2026년의 모던 웹 생태계에 맞춰 **React 19 Server Components (RSC)** 및 **Radix UI Primitives**를 기반으로 설계되었습니다. 모바일과 데스크톱 환경을 모두 아우르는 유연한 3계층(3-tier) 아키텍처를 제공합니다.

본 저장소는 공식 문서 및 소스 코드 저장소입니다. 라이브 컴포넌트 플레이그라운드는 [Storybook 환경](http://localhost:6007)에서 확인하실 수 있습니다.

---

## ✨ 핵심 기능 (Key Features)

| 기능 | 설명 |
|------|------|
| **AI 친화적 아키텍처** | 동적 조립 및 생성형 UI 패턴에 최적화된 모듈식 컴포넌트 설계 |
| **서버 컴포넌트 우선 (Server-First)** | React Server Components(RSC) 및 React Compiler에 완벽 대응 |
| **Eclipse 테마** | 글래스모피즘(Glassmorphism), 부드러운 다중 레이어 그림자, 세련된 인터랙션을 갖춘 공식 시각 언어 |
| **플랫폼 최적화 (Platform Fluidity)** | `EclipseProvider`를 통해 모바일과 PC 모드를 매끄럽게 전환하며 네이티브 수준의 UX 제공 |
| **강력한 접근성 (A11y)** | Radix UI를 근간으로 하여 WAI-ARIA 표준 및 키보드 네비게이션을 기본 지원 |
| **제로 런타임 스타일링** | Tailwind CSS v4 및 vanilla-extract를 결합하여 런타임 오버헤드가 없는 초고속 스타일링 |

---

## 📦 패키지 구성 (Packages)

모노레포 형태로 관리되며, 각 패키지는 명확한 역할을 가집니다.

| 패키지 | 설명 |
|--------|------|
| [`@orbit-ui/core`](./packages/core) | 스타일이 배제된(Headless) 핵심 로직 및 접근성 프리미티브 컴포넌트 |
| [`@orbit-ui/theme-eclipse`](./packages/theme-eclipse) | 현대적인 미학이 적용된 Orbit UI의 공식 Eclipse 테마 컴포넌트 |
| [`@orbit-ui/icons`](./packages/icons) | 시스템 전반에서 사용되는 최적화된 SVG 아이콘 라이브러리 |

---

## 🚀 시작하기 (Getting Started)

### 설치 (Installation)

```bash
pnpm add @orbit-ui/theme-eclipse
```

### 기본 사용법 (Basic Usage)

애플리케이션 최상단을 `EclipseProvider`로 감싸 테마 토큰과 플랫폼별 스타일링을 활성화하세요.

```tsx
import { SolidButton, EclipseProvider } from '@orbit-ui/theme-eclipse'
import '@orbit-ui/theme-eclipse/style.css'

function App() {
  return (
    <EclipseProvider mode="light" platform="pc">
      <SolidButton color="primary">시스템 초기화</SolidButton>
    </EclipseProvider>
  )
}
```

### 서버 컴포넌트 (Next.js App Router)

```tsx
// app/layout.tsx
import { EclipseProvider } from '@orbit-ui/theme-eclipse'
import '@orbit-ui/theme-eclipse/style.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <EclipseProvider platform="mobile">{children}</EclipseProvider>
      </body>
    </html>
  )
}
```

---

## 🛠 프로젝트 구조 (Project Structure)

```
orbit-ui/
├── packages/
│   ├── core/              # @orbit-ui/core - Headless Primitives
│   ├── theme-eclipse/     # @orbit-ui/theme-eclipse - Eclipse Design System
│   ├── icons/             # @orbit-ui/icons - Atomic Icons
│   ├── vite-plugin/       # 빌드 타임 최적화를 위한 Vite 플러그인
│   ├── eslint-plugin/     # 디자인 시스템 전용 커스텀 Lint 룰
│   └── generator/         # Plop 기반의 보일러플레이트 생성기
└── docs/                  # 아키텍처 및 시스템 가이드 문서
```

---

## 💻 개발 환경 (Development)

Orbit UI는 효율적인 모노레포 관리를 위해 **pnpm workspaces**를 사용합니다.

```bash
pnpm install      # 의존성 설치
pnpm dev          # Storybook 개발 서버 실행
pnpm build        # 전체 패키지 빌드
pnpm test         # 단위 테스트 및 시각적 회귀(Visual Regression) 테스트 실행
pnpm typecheck    # 정적 타입 검사
pnpm gen          # 신규 컴포넌트 보일러플레이트 생성
```

---

## 📄 공식 문서 (Documentation)

API 레퍼런스와 디자인 토큰을 포함한 전체 문서는 GitHub 저장소 내에서 관리됩니다.
- [아키텍처 딥다이브 (Architecture Deep Dive)](./docs/ARCHITECTURE.md)
- [Eclipse 디자인 토큰 (Design Tokens)](./packages/theme-eclipse/DesignToken.mdx)
- [컴포넌트 오버뷰 (Component Overview)](./packages/theme-eclipse/ComponentOverview.mdx)

---

## 🤝 기여하기 (Contributing)

Orbit UI 생태계를 함께 만들어갈 기여자를 환영합니다! 자세한 내용은 [기여 가이드(Contributing Guide)](./CONTRIBUTING.md)를 참고해 주세요.

---

## ⚖️ 라이선스 (License)

MIT License © 2026 Orbit UI Contributors. 더 아름답고 접근성 높은 웹을 구축하기 위해 헌신합니다.
