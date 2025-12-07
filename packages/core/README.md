# @ui-forge/core

[![npm](https://img.shields.io/npm/v/@ui-forge/core)](https://www.npmjs.com/package/@ui-forge/core)

> 스타일 미적용 Base 컴포넌트

## 설치

```bash
pnpm add @ui-forge/core
```

## 사용법

```tsx
import { Button, Provider } from '@ui-forge/core'
import '@ui-forge/core/style.css'

function App() {
  return (
    <Provider>
      <Button
        theme={{
          enabledFill: '#3B82F6',
          enabledForeground: '#FFFFFF',
        }}
      >
        <Button.Center>클릭</Button.Center>
      </Button>
    </Provider>
  )
}
```

## 컴포넌트

### 버튼
- `Button` - 기본 버튼

### 입력
- `TextField` - 텍스트 입력
- `FloatingTextField` - 플로팅 라벨 텍스트 입력
- `Checkbox` - 체크박스
- `RadioButton` - 라디오
- `Toggle` - 토글 스위치
- `Dropdown` - 드롭다운
- `Chip` - 칩

### 피드백
- `Badge` - 배지
- `AlertDialog` - 알림 다이얼로그
- `Toast` - 토스트

### 내비게이션
- `TabItem` - 탭
- `NavigationBar` - 네비게이션 바

### 레이아웃
- `Flex` - 플렉스박스
- `Spacer` - 여백
- `Divider` - 구분선
- `ListNode` - 리스트 아이템

### 오버레이
- `Sheet` - 바텀시트
- `Portal` - 포탈
- `Scrim` - 배경 오버레이

## 테마 커스터마이징

```tsx
<Button
  theme={{
    enabledFill: '#10B981',
    enabledForeground: '#FFFFFF',
    hoveredFill: '#059669',
    disabledFill: '#D1D5DB',
    paddingHorizontal: '24px',
    radius: '8px',
  }}
>
  <Button.Center>커스텀 버튼</Button.Center>
</Button>
```

## 라이선스

MIT
