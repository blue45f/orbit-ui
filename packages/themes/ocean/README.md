# @clay-kit/mint

[![npm](https://img.shields.io/npm/v/@clay-kit/mint)](https://www.npmjs.com/package/@clay-kit/mint)

> Mint 테마 컴포넌트

## 설치

```bash
pnpm add @clay-kit/mint
```

## 사용법

```tsx
import { Button, Provider } from '@clay-kit/mint'
import '@clay-kit/mint/style.css'

function App() {
  return (
    <Provider>
      <Button variant="filled" size="medium">
        확인
      </Button>
      <Button variant="outlined" size="medium">
        취소
      </Button>
    </Provider>
  )
}
```

## Next.js

```tsx
// app/layout.tsx
import { Provider } from '@clay-kit/mint/server'
import '@clay-kit/mint/style.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
```

## 컴포넌트

### 버튼
- `Button` - variant: filled, outlined, text
- `IconButton` - 아이콘 버튼

### 입력
- `TextField` - 텍스트 입력
- `TextArea` - 다중 줄 입력
- `Select` - 선택
- `Checkbox` - 체크박스
- `Radio` - 라디오
- `Switch` - 스위치

### 피드백
- `Alert` - 알림
- `Snackbar` - 스낵바
- `Badge` - 배지

### 내비게이션
- `Tabs` - 탭
- `TopBar` - 상단 바

### 레이아웃
- `Flex` - 플렉스박스
- `Spacer` - 여백
- `Divider` - 구분선

## 테마 커스터마이징

```tsx
<Button
  theme={{
    enabledFill: '#FF6B6B',
    enabledForeground: '#FFFFFF',
  }}
>
  커스텀
</Button>
```

## 라이선스

MIT
