# @clay-kit/foundation

[![npm](https://img.shields.io/npm/v/@clay-kit/foundation)](https://www.npmjs.com/package/@clay-kit/foundation)

> 스타일 미적용 Base 컴포넌트

## 설치

```bash
pnpm add @clay-kit/foundation
```

## 사용법

```tsx
import { BaseButton, Provider } from '@clay-kit/foundation'
import '@clay-kit/foundation/style.css'

function App() {
  return (
    <Provider>
      <BaseButton
        theme={{
          enabledFill: '#3B82F6',
          enabledForeground: '#FFFFFF',
        }}
      >
        <BaseButton.Center>클릭</BaseButton.Center>
      </BaseButton>
    </Provider>
  )
}
```

## 컴포넌트

### 버튼
- `BaseButton` - 기본 버튼

### 입력
- `BaseTextField` - 텍스트 입력
- `BaseCheckbox` - 체크박스
- `BaseRadio` - 라디오
- `BaseSwitch` - 스위치
- `BaseSelect` - 선택
- `BaseChip` - 칩

### 피드백
- `BaseBadge` - 배지
- `BaseAlert` - 알림
- `BaseSnackbar` - 스낵바

### 내비게이션
- `BaseTabs` - 탭
- `BaseNavigationBar` - 네비게이션 바

### 레이아웃
- `Flex` - 플렉스박스
- `Spacer` - 여백
- `Divider` - 구분선

### 오버레이
- `BaseSheet` - 시트
- `Portal` - 포탈

## 테마 커스터마이징

```tsx
<BaseButton
  theme={{
    enabledFill: '#10B981',
    enabledForeground: '#FFFFFF',
    hoveredFill: '#059669',
    disabledFill: '#D1D5DB',
    paddingHorizontal: '24px',
    radius: '8px',
  }}
>
  커스텀 버튼
</BaseButton>
```

## 라이선스

MIT
