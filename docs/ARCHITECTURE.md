# 아키텍처

Prism UI의 설계와 구현 원칙을 설명합니다.

---

## 목차

1. [개요](#개요)
2. [컴포넌트 명명 규칙](#컴포넌트-명명-규칙)
3. [컴포넌트 계층](#컴포넌트-계층)
4. [디자인 토큰](#디자인-토큰)
5. [레이어 시스템](#레이어-시스템)
6. [상태 관리](#상태-관리)
7. [스타일링](#스타일링)
8. [접근성](#접근성)

---

## 개요

Prism UI는 Figma 기반 3계층 컴포넌트 아키텍처를 제공합니다.

```
┌─────────────────────────────────────────────────────────────┐
│  Custom 컴포넌트 (프로젝트별 확장)                            │
├─────────────────────────────────────────────────────────────┤
│  Theme 컴포넌트 (@prism-ui/theme-ocean)                             │
│  └─ 테마가 적용된 즉시 사용 가능한 컴포넌트                    │
├─────────────────────────────────────────────────────────────┤
│  Base 컴포넌트 (@prism-ui/core)                        │
│  └─ 스타일 미적용 기능 컴포넌트                               │
├─────────────────────────────────────────────────────────────┤
│  디자인 토큰                                                  │
│  └─ Reference → Semantic → Component                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 컴포넌트 명명 규칙

### 새로운 이름 (권장)

기존 `Base*` 접두사를 제거한 더 직관적인 이름을 지원합니다.

```tsx
// 새 이름 (권장)
import { Button, Input, Toggle, Toast } from '@prism-ui/core'

// 기존 이름 (호환성 유지)
import { BaseButton, BaseTextField, BaseSwitch, BaseSnackbar } from '@prism-ui/core'
```

### 매핑 테이블

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
| `BaseDotIndicator` | `PageDots` | 페이지 인디케이터 |

---

## 컴포넌트 계층

### Base 컴포넌트

- 경로: `packages/foundation/src/components/`
- 스타일 미적용 기능 컴포넌트
- `style`, `className` props 열림
- `theme` prop으로 토큰 재정의 가능

```tsx
<BaseButton
  style={{ padding: '12px' }}
  theme={{ enabledFill: 'blue' }}
>
  버튼
</BaseButton>
```

### Theme 컴포넌트

- 경로: `packages/clay/mint/src/components/`
- Base 컴포넌트에 테마 적용
- `style`, `className` props 닫힘
- `theme` prop으로 토큰 재정의 가능

```tsx
<Button variant="filled" size="medium">
  버튼
</Button>
```

### Custom 컴포넌트

- 사용자 프로젝트에서 구현
- Base 또는 Theme 컴포넌트 확장

---

## 디자인 토큰

### 토큰 계층

```
Reference Token → Semantic Token → Component Token
     (원시값)        (의미적 값)       (컴포넌트별)
```

| 계층 | 예시 | 설명 |
|------|------|------|
| Reference | `colorBlue500` | 원시 색상값 |
| Semantic | `fillPrimary` | 의미적 용도 |
| Component | `buttonEnabledFill` | 컴포넌트별 |

### 토큰 파일

```
packages/foundation/src/tokens/
├── reference.ts      # 원시 토큰
├── semantic.ts       # 의미적 토큰
├── component.ts      # 컴포넌트 토큰
└── theme.css.ts      # CSS 변수
```

### 토큰 네이밍

```
{컴포넌트}{상태}{고유상태}{하위요소}{속성}
```

예시:
- `buttonEnabledFill` - 버튼 활성 배경색
- `buttonDisabledForeground` - 버튼 비활성 글자색
- `chipSelectedEnabledFill` - 칩 선택+활성 배경색

---

## 레이어 시스템

Figma 구조를 반영한 레이어 기반 컴포넌트 구조:

```
┌─────────────────────────────────────────┐
│           Container Layer               │
│  ┌───────────────────────────────────┐  │
│  │         State Layer               │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      Content Layer          │  │  │
│  │  │  ┌────┐ ┌────────┐ ┌────┐   │  │  │
│  │  │  │Lead│ │ Center │ │Trail│  │  │  │
│  │  │  └────┘ └────────┘ └────┘   │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│           Border Layer                   │
└─────────────────────────────────────────┘
```

| 레이어 | 역할 |
|--------|------|
| Container | 배경, 패딩, 반지름 |
| State | 상태 피드백 (hover, press, focus) |
| Content | 콘텐츠 배치 |
| Border | 테두리 |

### 레이어 사용

```tsx
<ContainerLayer>
  <StateLayer />
  <ContentLayer>
    {leading}
    {center}
    {trailing}
  </ContentLayer>
  <BorderLayer />
</ContainerLayer>
```

---

## 상태 관리

### 상태 유형

| 상태 | 설명 |
|------|------|
| `enabled` | 기본 활성 |
| `disabled` | 비활성 |
| `hovered` | 마우스 오버 |
| `pressed` | 클릭 |
| `focused` | 포커스 |

### 고유 상태

일부 컴포넌트는 고유 상태를 가집니다:

- Chip: `selected` / `unselected`
- Checkbox: `checked` / `unchecked`
- Switch: `on` / `off`

### Controllable State

제어/비제어 컴포넌트 패턴:

```tsx
const [value, setValue] = useControllableState({
  value: propValue,        // 제어 모드
  defaultValue,            // 비제어 모드
  onChange,
})
```

---

## 스타일링

### vanilla-extract

빌드 타임 CSS 생성으로 런타임 오버헤드 없음:

```ts
import { recipe } from '@vanilla-extract/recipes'
import { createStateRecipe } from '../../utils'

export const stateStyles = recipe(
  createStateRecipe({
    enabled: {
      background: vars.button.enabledFill,
      color: vars.button.enabledForeground,
    },
    disabled: {
      background: vars.button.disabledFill,
      color: vars.button.disabledForeground,
    },
  })
)
```

### 테마 적용

```tsx
const { themeVars } = useTheme(vars.button, theme)

return (
  <button style={themeVars}>
    {children}
  </button>
)
```

---

## 접근성

### ARIA 지원

```tsx
<button
  aria-disabled={disabled}
  aria-pressed={pressed}
  aria-expanded={expanded}
>
  {children}
</button>
```

### 키보드 네비게이션

- `Tab` - 포커스 이동
- `Enter/Space` - 활성화
- `Arrow` - 목록 내 이동
- `Escape` - 닫기

### 스크린 리더

- 시맨틱 HTML 사용
- ARIA 라벨 제공
- 동적 콘텐츠 live region

---

## 빌드 시스템

### Vite 설정

```ts
export default defineConfig({
  plugins: [
    react(),
    vanillaExtract(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
})
```

### 출력물

| 형식 | 파일 | 용도 |
|------|------|------|
| ESM | `dist/index.js` | 모던 번들러 |
| CJS | `dist/index.cjs` | Node.js |
| Types | `dist/index.d.ts` | TypeScript |
| CSS | `dist/style.css` | 스타일 |

---

## 테스트

### 단위 테스트

```tsx
describe('Button', () => {
  it('렌더링된다', () => {
    render(<Button>클릭</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('disabled 상태에서 클릭 무시', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>클릭</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

### 스토리북

```tsx
export default {
  title: 'Components/Button',
  component: Button,
}

export const Default = {
  args: {
    children: '버튼',
  },
}

export const AllVariants = () => (
  <div>
    <Button variant="filled">Filled</Button>
    <Button variant="outlined">Outlined</Button>
  </div>
)
```
