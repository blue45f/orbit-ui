# @prism-ui/theme-ocean

[![npm](https://img.shields.io/npm/v/@prism-ui/theme-ocean)](https://www.npmjs.com/package/@prism-ui/theme-ocean)

> Ocean 테마 컴포넌트

## 설치

```bash
pnpm add @prism-ui/theme-ocean
```

## 사용법

```tsx
import { SolidButton, OutlinedButton, ForgeRoot } from '@prism-ui/theme-ocean'
import '@prism-ui/theme-ocean/style.css'

function App() {
  return (
    <ForgeRoot>
      <SolidButton variant="primary" size="medium">
        확인
      </SolidButton>
      <OutlinedButton variant="primary" size="medium">
        취소
      </OutlinedButton>
    </ForgeRoot>
  )
}
```

## Next.js

```tsx
// app/layout.tsx
import { ForgeRoot } from '@prism-ui/theme-ocean/server'
import '@prism-ui/theme-ocean/style.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ForgeRoot>{children}</ForgeRoot>
      </body>
    </html>
  )
}
```

## 컴포넌트

### 버튼
- `SolidButton` - 채워진 버튼
- `OutlinedButton` - 외곽선 버튼
- `TextButton` - 텍스트 버튼
- `IconButton` - 아이콘 버튼

### 입력
- `TextField` - 텍스트 입력
- `FloatingTextField` - 플로팅 라벨 입력
- `Dropdown` - 드롭다운
- `Checkbox` - 체크박스
- `RadioButton` - 라디오
- `Toggle` - 토글 스위치

### 피드백
- `AlertDialog` - 알림 다이얼로그
- `Toast` - 토스트
- `Badge` - 배지

### 내비게이션
- `TabItem` - 탭
- `NavigationBar` - 네비게이션 바

### 레이아웃
- `Flex` - 플렉스박스
- `Spacer` - 여백
- `Divider` - 구분선

## 테마 커스터마이징

```tsx
<SolidButton
  theme={{
    enabledFill: '#FF6B6B',
    enabledForeground: '#FFFFFF',
  }}
>
  커스텀
</SolidButton>
```

## 라이선스

MIT
