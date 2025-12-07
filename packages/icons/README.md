# @prism-ui/icons

[![npm](https://img.shields.io/npm/v/@prism-ui/icons)](https://www.npmjs.com/package/@prism-ui/icons)

> SVG 아이콘 컴포넌트

## 설치

```bash
pnpm add @prism-ui/icons
```

## 사용법

```tsx
import { PlusIcon, CheckIcon, CloseIcon } from '@prism-ui/icons'

function App() {
  return (
    <div>
      <PlusIcon size={24} />
      <CheckIcon size={24} color="green" />
      <CloseIcon size={24} />
    </div>
  )
}
```

## 버튼과 함께 사용

```tsx
import { SolidButton } from '@prism-ui/theme-ocean'
import { PlusIcon } from '@prism-ui/icons'

function App() {
  return (
    <SolidButton>
      <SolidButton.Leading>
        <PlusIcon />
      </SolidButton.Leading>
      추가
    </SolidButton>
  )
}
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `size` | `number` | `24` | 크기 (px) |
| `color` | `string` | `currentColor` | 색상 |
| `className` | `string` | - | CSS 클래스 |
| `style` | `CSSProperties` | - | 인라인 스타일 |

## 아이콘 컨텍스트

```tsx
import { IconPropsContext } from '@prism-ui/icons'

<IconPropsContext.Provider value={{ size: 20, color: 'blue' }}>
  <PlusIcon />  {/* 20px, blue */}
  <MinusIcon /> {/* 20px, blue */}
</IconPropsContext.Provider>
```

## 라이선스

MIT
