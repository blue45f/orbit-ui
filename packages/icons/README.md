# @heejun-com/icons

[![npm](https://img.shields.io/npm/v/@heejun-com/icons)](https://www.npmjs.com/package/@heejun-com/icons)

> SVG 아이콘 컴포넌트

## 설치

```bash
pnpm add @heejun-com/icons
```

## 사용법

```tsx
import { PlusIcon, CheckIcon, CloseIcon } from '@heejun-com/icons'

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
import { SolidButton } from '@heejun-com/theme-eclipse'
import { PlusIcon } from '@heejun-com/icons'

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

| Prop        | 타입                      | 기본값         | 설명                                                      |
| ----------- | ------------------------- | -------------- | --------------------------------------------------------- |
| `size`      | `number`                  | `24`           | 크기 (px)                                                 |
| `color`     | `string`                  | `currentColor` | 색상                                                      |
| `className` | `string`                  | -              | CSS 클래스                                                |
| `style`     | `CSSProperties`           | -              | 인라인 스타일                                             |
| `tone`      | `flat \| soft \| premium` | `flat`         | `flat`: 기본, `soft`: 은은한 음영, `premium`: 입체적 강조 |

추가로 CSS 커스텀 프로퍼티를 통해 톤 스타일을 글로벌하게 제어할 수 있습니다.
기본 값은 다음과 같습니다.

```css
:root {
  --heejun-icon-tone-soft-filter: drop-shadow(0 1px 1px rgba(14, 20, 34, 0.08));
  --heejun-icon-tone-premium-filter: drop-shadow(0 1px 4px rgba(14, 20, 34, 0.16));
}
```

## 아이콘 컨텍스트

```tsx
import { IconPropsContext } from '@heejun-com/icons'
;<IconPropsContext.Provider value={{ size: 20, color: 'blue' }}>
  <PlusIcon /> {/* 20px, blue */}
  <MinusIcon /> {/* 20px, blue */}
</IconPropsContext.Provider>
```

```tsx
import { IconPropsContext } from '@heejun-com/icons'
;<IconPropsContext.Provider value={{ size: 20, color: 'blue', tone: 'premium' }}>
  <PlusIcon /> {/* 20px, blue, premium 톤 */}
  <MinusIcon /> {/* 20px, blue, premium 톤 */}
</IconPropsContext.Provider>
```

## 라이선스

MIT
