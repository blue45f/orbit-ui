# 기여 가이드

Clay Kit에 관심을 가져주셔서 감사합니다!

---

## 목차

1. [개발 환경 설정](#개발-환경-설정)
2. [프로젝트 구조](#프로젝트-구조)
3. [컴포넌트 개발](#컴포넌트-개발)
4. [테스트](#테스트)
5. [커밋 규칙](#커밋-규칙)
6. [Pull Request](#pull-request)

---

## 개발 환경 설정

### 요구사항

| 도구 | 버전 | 설치 방법 |
|------|------|----------|
| Node.js | v20+ | [nodejs.org](https://nodejs.org) |
| pnpm | v9+ | `corepack enable && corepack prepare pnpm@latest --activate` |

### 설정

```bash
# 저장소 클론
git clone https://github.com/aspect-ui/clay-kit.git
cd clay-kit

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

### 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm dev` | 스토리북 실행 |
| `pnpm build` | 전체 패키지 빌드 |
| `pnpm test` | 전체 테스트 실행 |
| `pnpm typecheck` | 타입 체크 |
| `pnpm lint` | 린트 검사 |
| `pnpm gen` | 새 컴포넌트 생성 |

---

## 프로젝트 구조

```
prism-ui/
├── packages/
│   ├── core/                    # @prism-ui/core
│   │   └── src/
│   │       ├── components/      # Base 컴포넌트
│   │       ├── libs/            # 훅, 유틸리티
│   │       └── styles/          # 디자인 토큰
│   │
│   ├── theme-ocean/             # @prism-ui/theme-ocean
│   │   └── src/
│   │       ├── components/      # 테마 컴포넌트
│   │       └── styles/          # Ocean 테마 토큰
│   │
│   ├── icons/                   # @prism-ui/icons
│   ├── vite-plugin/             # @prism-ui/vite-plugin
│   ├── eslint-plugin/           # @prism-ui/eslint-plugin
│   └── generator/               # @prism-ui/generator
│
└── config/
    ├── tsconfig/                # 공유 TS 설정
    └── figma/                   # Figma 도구
```

### 컴포넌트 파일 구조

```
Button/
├── Button.tsx           # 컴포넌트
├── Button.styles.ts     # 스타일
├── Button.stories.tsx   # 스토리북
├── Button.test.tsx      # 테스트
└── index.ts             # export
```

---

## 컴포넌트 개발

### 컴포넌트 생성

```bash
pnpm gen
```

### Base 컴포넌트 구조

```tsx
// packages/core/src/components/Button/Button.tsx
import { forwardRef } from 'react'
import { useTheme } from '../../hooks'
import { container, stateStyles } from './Button.styles'

export interface ButtonProps {
  disabled?: boolean
  children?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disabled = false, children, ...props }, ref) => {
    const theme = useTheme('button')
    
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={container}
        style={theme}
        {...props}
      >
        {children}
      </button>
    )
  }
)
```

### 테마 컴포넌트 구조

```tsx
// packages/theme-mint/src/components/Button/Button.tsx
import { forwardRef } from 'react'
import { Button as BaseButton, ButtonProps as BaseProps } from '@aspect-ui/core'
import { mintTokens } from '../../tokens'

export interface ButtonProps extends Omit<BaseProps, 'theme'> {
  variant?: 'filled' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'filled', size = 'medium', ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        theme={{
          ...mintTokens.button,
          ...mintTokens.button.variant[variant],
          ...mintTokens.button.size[size],
        }}
        {...props}
      />
    )
  }
)
```

---

## 테스트

### 테스트 실행

```bash
# 전체 테스트
pnpm test

# 특정 패키지
pnpm test --filter @aspect-ui/core

# Watch 모드
pnpm test:watch
```

### 테스트 작성

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('렌더링된다', () => {
    render(<Button>클릭</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('클릭 이벤트가 동작한다', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>클릭</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
  })
})
```

---

## 커밋 규칙

### 형식

```
<타입>(<범위>): <제목>

<본문>
```

### 타입

| 타입 | 설명 |
|------|------|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `style` | 코드 포맷팅 |
| `refactor` | 리팩토링 |
| `test` | 테스트 |
| `chore` | 빌드/설정 변경 |

### 예시

```
feat(button): 로딩 상태 추가

- loading prop 추가
- 로딩 스피너 표시
```

---

## Pull Request

### PR 전 체크리스트

- [ ] 타입 체크 통과 (`pnpm typecheck`)
- [ ] 테스트 통과 (`pnpm test`)
- [ ] 빌드 성공 (`pnpm build`)
- [ ] changeset 추가 (`pnpm changeset`)

### changeset 추가

```bash
pnpm changeset
```

1. 변경된 패키지 선택
2. 버전 유형 선택 (patch/minor/major)
3. 변경 내용 요약 작성

---

## 도움이 필요하신가요?

- 📖 [아키텍처 문서](./docs/ARCHITECTURE.md)
- 🐛 [이슈 리포트](https://github.com/aspect-ui/clay-kit/issues)
