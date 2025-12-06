<p align="center">
  <h1 align="center">UI Forge</h1>
</p>

<p align="center">
  <strong>Figma 기반 React 디자인 시스템 컴포넌트 라이브러리</strong>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" /></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-61dafb" alt="React" /></a>
</p>

---

## 주요 특징

| 특징 | 설명 |
|------|------|
| **Figma 연동** | Figma Variables와 동기화된 디자인 토큰 |
| **계층적 구조** | Base → Theme → Custom 3단계 아키텍처 |
| **테마 커스터마이징** | `theme` prop으로 스타일 재정의 |
| **접근성** | WAI-ARIA 표준 준수 |
| **Tree Shaking** | 필요한 컴포넌트만 번들에 포함 |
| **TypeScript** | 완벽한 타입 지원 |

---

## 패키지

| 패키지 | 설명 |
|--------|------|
| `@ui-forge/core` | Base 컴포넌트 (스타일 미적용) |
| `@ui-forge/theme-ocean` | Ocean 테마 컴포넌트 |
| `@ui-forge/icons` | SVG 아이콘 |

---

## 시작하기

### 설치

```bash
pnpm add @ui-forge/theme-ocean
```

### 기본 사용법

```tsx
import { SolidButton, OutlinedButton, ForgeRoot } from '@ui-forge/theme-ocean'
import '@ui-forge/theme-ocean/style.css'

function App() {
  return (
    <ForgeRoot>
      <SolidButton>확인</SolidButton>
      <OutlinedButton>취소</OutlinedButton>
    </ForgeRoot>
  )
}
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import { ForgeRoot } from '@ui-forge/theme-ocean/server'
import '@ui-forge/theme-ocean/style.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ForgeRoot>{children}</ForgeRoot>
      </body>
    </html>
  )
}
```

---

## 컴포넌트

### Base 컴포넌트 (@ui-forge/core)

Base 컴포넌트는 스타일이 적용되지 않은 기능 컴포넌트입니다.

```tsx
import { Button, TextField, Toggle, Toast } from '@ui-forge/core'
```

### Theme 컴포넌트 (@ui-forge/theme-ocean)

Ocean 테마가 적용된 스타일 컴포넌트입니다.

```tsx
import { SolidButton, TextField, Checkbox, Radio } from '@ui-forge/theme-ocean'
```

---

## 프로젝트 구조

```
ui-forge/
├── packages/
│   ├── core/              # @ui-forge/core - Base 컴포넌트
│   ├── themes/ocean/      # @ui-forge/theme-ocean - Ocean 테마
│   └── icons/             # @ui-forge/icons - 아이콘
├── tools/
│   ├── vite-plugin/       # 빌드 플러그인
│   ├── eslint-plugin-custom-sort/ # CSS 속성 정렬 규칙
│   └── plop/              # 컴포넌트 생성기
└── docs/                  # 문서
```

---

## 개발

### 요구사항

| 도구 | 버전 |
|------|------|
| Node.js | v20+ |
| pnpm | v9+ |

### 명령어

```bash
pnpm install      # 설치
pnpm dev          # 스토리북 실행
pnpm build        # 빌드
pnpm test         # 테스트
pnpm typecheck    # 타입 체크
pnpm lint         # 린트
pnpm gen          # 컴포넌트 생성
pnpm changeset    # 변경셋 생성
```

---

## 기여

기여를 환영합니다! [기여 가이드](./CONTRIBUTING.md)를 참고하세요.

---

## 라이선스

MIT License © UI Forge Contributors
