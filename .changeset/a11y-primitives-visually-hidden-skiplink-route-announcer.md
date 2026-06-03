---
'@heejun-com/core': minor
---

a11y 프리미티브 3종을 추가했어요: `VisuallyHidden`, `SkipLink`, `RouteAnnouncer`(+ `useRouteAnnouncer` 훅).

- `VisuallyHidden`: 시각적으로는 감추되 접근성 트리에는 노출하는 polymorphic(`as`) 컴포넌트. `globals.css`의 `.sr-only` 기법을 캡슐화했어요.
- `SkipLink`: 키보드/스크린 리더 사용자를 위한 "본문 바로가기" 링크. 평소엔 숨겨졌다가 포커스를 받으면 나타나요.
- `useRouteAnnouncer` / `RouteAnnouncer`: 라우터에 의존하지 않는 라우트 안내기. polite `aria-live` 영역으로 페이지 변경을 알리고, 본문 랜드마크로 포커스를 옮기며, 첫 페인트는 건너뛰어요.
