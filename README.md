<p align="center">
  <h1 align="center">🎨 Clay Kit</h1>
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

## ✨ 주요 특징

| 특징 | 설명 |
|------|------|
| 🎯 **Figma 연동** | Figma Variables와 동기화된 디자인 토큰 |
| 🧱 **계층적 구조** | Base → Theme → Custom 3단계 아키텍처 |
| 🎨 **테마 커스터마이징** | `theme` prop으로 스타일 재정의 |
| ♿ **접근성** | WAI-ARIA 표준 준수 |
| 📦 **Tree Shaking** | 필요한 컴포넌트만 번들에 포함 |
| 🔧 **TypeScript** | 완벽한 타입 지원 |

---

## 📦 패키지

| 패키지 | 설명 |
|--------|------|
| `@clay-kit/foundation` | Base 컴포넌트 (스타일 미적용) |
| `@clay-kit/mint` | Mint 테마 컴포넌트 |
| `@clay-kit/icons` | SVG 아이콘 |

---

## 🚀 시작하기

### 설치

```bash
pnpm add @clay-kit/mint
```

### 기본 사용법

```tsx
import { FilledButton, OutlinedButton, ClayRoot } from '@clay-kit/mint'
import '@clay-kit/mint/style.css'

function App() {
  return (
    <ClayRoot>
      <FilledButton>확인</FilledButton>
      <OutlinedButton>취소</OutlinedButton>
    </ClayRoot>
  )
}
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import { ClayRoot } from '@clay-kit/mint/server'
import '@clay-kit/mint/style.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ClayRoot>{children}</ClayRoot>
      </body>
    </html>
  )
}
```

---

## 🧩 컴포넌트

### 새로운 컴포넌트명 (권장)

Base 컴포넌트의 `Base` 접두사를 제거한 더 직관적인 이름을 사용할 수 있습니다.

```tsx
// 새 이름 (권장)
import { Button, Input, Toggle, Toast } from '@clay-kit/foundation'

// 기존 이름 (호환성 유지)
import { BaseButton, BaseTextField, BaseSwitch, BaseSnackbar } from '@clay-kit/foundation'
```

### 컴포넌트 매핑

| 기존 | 새 이름 | 설명 |
|------|---------|------|
| `BaseButton` | `Button` | 버튼 |
| `BaseTextField` | `Input` | 입력 필드 |
| `BaseSwitch` | `Toggle` | 토글 스위치 |
| `BaseSnackbar` | `Toast` | 토스트 알림 |
| `BaseSheet` | `Sheet` | 바텀시트 |
| `BaseCheckbox` | `Checkbox` | 체크박스 |
| `BaseRadio` | `Radio` | 라디오 버튼 |
| `BaseSelect` | `Select` | 선택 |
| `BaseChip` | `Chip` | 칩 |
| `BaseTabs` | `Tabs` | 탭 |
| `BaseAlert` | `Alert` | 알림 |
| `BaseBadge` | `Badge` | 배지 |
| `BaseDivider` | `Divider` | 구분선 |
| `BaseSpacer` | `Spacer` | 여백 |
| `BaseNavigationBar` | `NavBar` | 네비게이션 바 |
| `BaseScrim` | `Backdrop` | 배경 오버레이 |

---

## 📁 프로젝트 구조

```
clay-kit/
├── packages/
│   ├── foundation/        # Base 컴포넌트
│   ├── clay/mint/         # Mint 테마 컴포넌트
│   └── icons/             # 아이콘
├── tools/
│   └── vite-plugin/       # 빌드 플러그인
└── docs/                  # 문서
```

---

## 🛠️ 개발

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
```

---

## 🤝 기여

기여를 환영합니다! [기여 가이드](./CONTRIBUTING.md)를 참고하세요.

---

## 📄 라이선스

MIT License © Clay Kit Contributors
