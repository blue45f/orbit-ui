# Migration

## 스페이싱 토큰

클레이 블루와 민트 v1 배포 시 스페이싱 토큰의 기준값이 서로 달랐어요. 코어 기반의 토큰으로 고도화 하는 과정에서 기준값을 맞춰야 할 필요성이 커짐에 따라 민트 스페이싱 토큰 마이그레이션을 지원합니다.

> 💡 기존 스페이싱 토큰 값을 바꾸는건 많은 breaking changes을 발생시키기 때문에 원하는 시점에 마이그레이션하는 방법으로 지원해요. 추후 v2 메이저 업데이트에서는 신규 스페이싱 토큰이 기본값이 됩니다.

### `tokenMode=recommended` 선언

먼저 `ClayRoot`를 통해 새 토큰 모드를 활성화 할 수 있어요.

```tsx
<ClayRoot tokenMode='recommended'>{/* ... */}</ClayRoot>
```

### 스페이싱 토큰 변환 테이블

활성화하면 아래 테이블에 맞춰 각 토큰에 대응되는 실제 픽셀값이 변경돼요.

| 실제값 | 변경 전 | 변경 후           |
| ------ | ------- | ----------------- |
| 0px    | none    | none              |
| 1px    | 50      | px                |
| 2px    | 100     | 25                |
| 3px    | 150     | 25 (2px로 대체)   |
| 4px    | 200     | 50                |
| 5px    | 250     | 50 (4px로 대체)   |
| 6px    | 300     | 75                |
| 8px    | 400     | 100               |
| 10px   | 500     | 125               |
| 12px   | 600     | 150               |
| 14px   | 700     | 175               |
| 15px   | 750     | 200 (16px로 대체) |
| 16px   | 800     | 200               |
| 18px   | 900     | 225               |
| 20px   | 1000    | 250               |
| 24px   | 1100    | 300               |
| 32px   | 1200    | 400               |
| 40px   | 1300    | 500               |
| 48px   | 1400    | 600               |

선언된 `tokenMode`에 맞춰 내부 구현 값은 자동으로 변환됩니다. 예를 들어 기존에 '400'이었던 스페이싱 값은 8px 값을 유지하기 위해 '100'으로 변경돼요.

### 🚨 사용자 대응이 필요한 작업 1. 스페이싱 토큰 값 변경

사용자 측에서 스페이싱 토큰으로 전달하는 코드 호환 작업이 필요해요. 해당되는 컴포넌트와 prop 목록 정보는 아래 테이블을 참고해주세요.

| 컴포넌트명             | prop명                       |
| ---------------------- | ---------------------------- |
| `Container`            | `spacing`                    |
| `Divider`              | `margin`                     |
| `Flex`                 | `gap`, `rowGap`, `columnGap` |
| `Form`                 | `fieldGap`                   |
| `Form.Field`           | `fieldGap`                   |
| `ListItem`             | `spacing`                    |
| `TextListItem.Label`   | `gap`                        |
| `TextListItem.Content` | `gap`                        |
| `Thumbnail`            | `spacing`                    |
| `Thumbnail.Info`       | `spacing`                    |

해당되는 prop 값을 '스페이싱 토큰 변환 테이블' 값에 맞춰 변환시켜 줍니다.

#### 예제 1. 문자열 타입의 prop 마이그레이션

```tsx
// Before
<Container spacing='400'>{/* ... */}</Container>
<Flex gap='200'>{/* ... */}</Flex>

// After
<Container spacing='100'>{/* ... */}</Container>
<Flex gap='50'>{/* ... */}</Flex>
```

#### 예제 2. 객체 타입의 prop 마이그레이션

```tsx
// Before
<Divider margin={{ start: '600', end: '300' }} />
<ListItem spacing={{ x: '200', y: '400' }}>{/* ... */}</ListItem>

// After
<Divider margin={{ start: '150', end: '75' }} />
<ListItem spacing={{ x: '50', y: '100' }}>{/* ... */}</ListItem>

```

### 🚨 사용자 대응이 필요한 작업 2. SSR 대응

SSR 환경인 경우 body 요소 className을 직접 연결할 수 있어요. 신규 스페이싱 토큰을 사용하려면 tokenMode 옵션을 객체로 전달해주세요.

```tsx
import { getTheme } from '@prism-ui/theme-ocean/server'

// Before
<body className={getTheme()}>
  {/* ... */}
</body>

// After
<body className={getTheme({ tokenMode: 'recommended' })}>
  {/* ... */}
</body>
```

## Radius 토큰

코어 기반의 토큰으로 고도화 하는 과정에서 기준값을 맞춰야 할 필요성이 커짐에 따라 민트 radius 토큰 마이그레이션을 지원합니다.

> 💡 기존 radius 토큰 값을 바꾸는건 많은 breaking changes을 발생시키기 때문에 원하는 시점에 마이그레이션하는 방법으로 지원해요. 추후 v2 메이저 업데이트에서는 신규 radius 토큰이 기본값이 됩니다.

### `tokenMode=recommended` 선언

먼저 `ClayRoot`를 통해 새 토큰 모드를 활성화 할 수 있어요.

```tsx
<ClayRoot tokenMode='recommended'>{/* ... */}</ClayRoot>
```

### Radius 토큰 변환 테이블

활성화하면 아래 테이블에 맞춰 각 토큰에 대응되는 실제 픽셀값이 변경돼요.

| 실제값 | 변경 전 | 변경 후 |
| ------ | ------- | ------- |
| 0px    | none    | none    |
| 2px    | -       | xsmall  |
| 4px    | xsmall  | small   |
| 8px    | small   | medium  |
| 12px   | medium  | large   |
| 16px   | large   | xlarge  |
| 20px   | xxlarge | xxlarge |
| 9999px | full    | rounded |

선언된 `tokenMode`에 맞춰 내부 구현 값은 자동으로 변환됩니다. 예를 들어 기존에 'small'이었던 radius 값은 4px 값을 유지하기 위해 'xsmall'로 변경돼요.

### 🚨 사용자 대응이 필요한 작업 1. Radius 토큰 값 변경

사용자 측에서 radius 토큰으로 전달하는 코드 호환 작업이 필요해요. 해당되는 컴포넌트와 prop 목록 정보는 아래 테이블을 참고해주세요.

| 컴포넌트명   | prop명   |
| ------------ | -------- |
| `Badge`      | `radius` |
| `Banner`     | `radius` |
| `Button`     | `radius` |
| `Chip`       | `radius` |
| `CountBadge` | `radius` |
| `CTAButton`  | `radius` |
| `Thumbnail`  | `radius` |

아래 예제와 같이 radius 토큰을 직접 가져다 쓰는 코드가 있는지 확인 및 변경해주세요.

```ts
import { vars } from '@prism-ui/theme-ocean/token'

const someStyle = `
  border-radius: ${vars.radius.medium}; // <- vars.radius.small로 변경
`
```

해당되는 prop 값을 'Radius 토큰 변환 테이블' 값에 맞춰 변환시켜 줍니다.

### 🚨 사용자 대응이 필요한 작업 2. SSR 대응

SSR 환경인 경우 body 요소 className을 직접 연결할 수 있어요. 신규 radius 토큰을 사용하려면 tokenMode 옵션을 객체로 전달해주세요.

```tsx
import { getTheme } from '@prism-ui/theme-ocean/server'

// Before
<body className={getTheme()}>
  {/* ... */}
</body>

// After
<body className={getTheme({ tokenMode: 'recommended' })}>
  {/* ... */}
</body>
```

## 신규 토큰 부분 활성화

아래 코드와 같이 `ClayRoot`의 `tokenMode` prop을 객체로 전달해 부분 활성화 할 수 있어요.

```tsx
// 신규 스페이싱 토큰만 활성화
<ClayRoot tokenMode={{ spacing: 'recommended' }}>{/* ... */}</ClayRoot>

// 신규 radius 토큰만 활성화
<ClayRoot tokenMode={{ radius: 'recommended' }}>{/* ... */}</ClayRoot>
```

SSR 대응을 위한 함수 `getTheme`도 동일하게 적용 가능해요.

## React 17과 Webpack을 사용하는 환경의 대응

v1.59.0부터 React 19 환경에서 Prism UI을 사용할 수 있어요. React 19 변경점 대응을 위해, React 17과 Webpack을 사용하는 환경에서는 다음과 같이 Webpack의 config에 옵션 추가가 필요해요. 히스토리 문서도 참고해주세요.

- [React19 기술리뷰](https://cloud.wiki.claykit.in/wiki/spaces/SVCWEB/pages/364746081/2025-02+React19)
- [jsx transform 트러블 슈팅](https://cloud.wiki.claykit.in/wiki/spaces/SVCWEB/pages/492234416/jsx+transform)

```js
//webpack.config.js
module.export = {
  ...
  resolve: {
    alias: {
      'react/jsx-runtime': require.resolve('react/jsx-runtime'), // 추가
    }
  }
}
```

## Thumbnail 컴포넌트

v2.0.0에서 `ThumbnailDeprecated` 컴포넌트가 제거되고, 새로운 서브컴포넌트 패턴의 `Thumbnail`만 지원합니다.

### 🚨 Breaking Changes

기존의 deprecated props를 사용한 방식은 더 이상 지원되지 않습니다:

- `src`, `fallbackSrc`, `alt` → `Thumbnail.Image` 서브컴포넌트 사용
- `dimmed`, `dimmerText` → `Thumbnail.Scrim`, `Thumbnail.ScrimDescription` 서브컴포넌트 사용
- `loading` → `Thumbnail.Image`의 `loading` prop 사용
- `spacing` → `Thumbnail.Info`의 `spacing` prop 사용

### 마이그레이션 가이드

#### 1. 기본 이미지 표시

**Before (v1.x):**

```tsx
<Thumbnail src='https://example.com/image.jpg' alt='대체 텍스트' ratio='1:1' />
```

**After (v2.x):**

```tsx
<Thumbnail ratio='1:1'>
  <Thumbnail.Image src='https://example.com/image.jpg' alt='대체 텍스트' />
</Thumbnail>
```

#### 2. fallbackSrc 사용

**Before (v1.x):**

```tsx
<Thumbnail src='' fallbackSrc='https://example.com/fallback.jpg' alt='대체 텍스트' />
```

**After (v2.x):**

```tsx
<Thumbnail>
  <Thumbnail.Image src='' fallbackSrc='https://example.com/fallback.jpg' alt='대체 텍스트' />
</Thumbnail>
```

#### 3. 정보 영역 표시

**Before (v1.x):**

```tsx
<Thumbnail src='image.jpg' spacing={{ bottom: '100' }}>
  <Badge>판매중</Badge>
</Thumbnail>
```

**After (v2.x):**

```tsx
<Thumbnail>
  <Thumbnail.Image src='image.jpg' />
  <Thumbnail.Info spacing={{ bottom: '100' }}>
    <Badge>판매중</Badge>
  </Thumbnail.Info>
</Thumbnail>
```

#### 4. Dimmed 효과 (Scrim)

**Before (v1.x):**

```tsx
<Thumbnail src='image.jpg' dimmed dimmerText='재입고 예정' />
```

**After (v2.x):**

```tsx
<Thumbnail>
  <Thumbnail.Image src='image.jpg' />
  <Thumbnail.Scrim />
  <Thumbnail.ScrimDescription>재입고 예정</Thumbnail.ScrimDescription>
</Thumbnail>
```

#### 5. 복합 구성 (정보 + Scrim)

**Before (v1.x):**

```tsx
<Thumbnail src='image.jpg' dimmed dimmerText='재입고 예정' spacing={{ all: '200' }}>
  <Badge>인기</Badge>
</Thumbnail>
```

**After (v2.x):**

```tsx
<Thumbnail>
  <Thumbnail.Image src='image.jpg' />
  <Thumbnail.Info spacing={{ all: '200' }}>
    <Badge>인기</Badge>
  </Thumbnail.Info>
  <Thumbnail.Scrim />
  <Thumbnail.ScrimDescription>재입고 예정</Thumbnail.ScrimDescription>
</Thumbnail>
```

#### 6. 이미지 로딩 설정

**Before (v1.x):**

```tsx
<Thumbnail src='image.jpg' loading='lazy' />
```

**After (v2.x):**

```tsx
<Thumbnail>
  <Thumbnail.Image src='image.jpg' loading='lazy' />
</Thumbnail>
```

### 서브컴포넌트 상세

#### `Thumbnail.Image`

- **역할**: 이미지 표시 및 fallback 처리
- **주요 props**: `src`, `fallbackSrc`, `alt`, `loading`

#### `Thumbnail.Info`

- **역할**: 정보 영역 (Badge, IconButton 등)
- **주요 props**: `spacing`

#### `Thumbnail.Scrim`

- **역할**: 어둡게 처리하는 오버레이
- **주요 props**: `bgColor`

#### `Thumbnail.ScrimDescription`

- **역할**: Scrim 위의 텍스트 표시
- **사용법**: children으로 텍스트 전달

#### `Thumbnail.Picture`

- **역할**: `<picture>` 태그 사용 시
- **사용법**: `<source>` 태그와 함께 반응형 이미지

### 마이그레이션 체크리스트

- [ ] `src`, `fallbackSrc`, `alt` props → `Thumbnail.Image` 서브컴포넌트로 이동
- [ ] `dimmed`, `dimmerText` props → `Thumbnail.Scrim`, `Thumbnail.ScrimDescription`로 분리
- [ ] `spacing` prop → `Thumbnail.Info`의 `spacing`으로 이동
- [ ] `loading` prop → `Thumbnail.Image`의 `loading`으로 이동
- [ ] children이 있는 경우 → `Thumbnail.Info`로 감싸기
- [ ] 복합 구성 시 서브컴포넌트 순서 확인 (Image → Info → Scrim → ScrimDescription)

### 장점

✅ **명확한 구조**: 각 역할이 서브컴포넌트로 분리되어 직관적  
✅ **유연한 조합**: 필요한 부분만 선택적으로 사용 가능  
✅ **타입 안전성**: 각 서브컴포넌트별 적절한 props 타입 제공  
✅ **성능 최적화**: 불필요한 렌더링 방지  
✅ **유지보수성**: 각 기능별로 독립적인 관리 가능
