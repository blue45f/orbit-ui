# orbit-ui Development Guide

## 개요

이 프로젝트는 아키텍처 문서 정합성, 코드 변경 범위, CI 게이트를 함께 관리합니다.

## 필수 검증 흐름

- 아키텍처 문서 점검을 선행합니다.
- 타입/린트/테스트/빌드 검증을 완료합니다.
- PR 병합 전 증적을 남깁니다.

## 최소 실행 커맨드

- `pnpm run dev`
- `pnpm run build`
- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run verify`
- `pnpm run ci`

## 아키텍처 변경 규칙

1. 도메인 경계와 공유 타입 계약 변경은 `docs/ARCHITECTURE.md`에서 먼저 반영합니다.
2. 계약 변경이 API/스키마에 영향을 주면 문서와 테스트 계획을 함께 갱신합니다.
3. `pnpm run verify`는 `validate:architecture`가 선행된 상태여야 합니다.

## PR 체크리스트

- 변경 범위 요약
- 영향 받는 도메인
- 실행한 검증 명령어 및 결과
- 회귀 확인 항목

## 배포

배포 형태(npm 라이브러리 + Vercel Storybook), 정확한 명령, 필요한 GitHub Secrets,
preview/production 차이, 메인테이너 일회성 설정은 [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md)에
정리되어 있습니다. 이 저장소에는 백엔드 서버가 없어 Dockerfile/render.yaml은 두지 않습니다.

## 접근성(a11y) 테스트

모달·시트 같은 포커스 격리 동작은 `useFocusTrap`이 담당하며, 레이아웃 비의존 로직
(자동 포커스 / Tab·Shift+Tab 순환 / 언마운트 시 포커스 복원)은
`packages/core/src/libs/hooks/useFocusTrap.test.tsx`에서 jsdom 단위 테스트로 검증합니다.
포커스 관련 a11y 훅을 추가/수정하면 이 패턴(`renderHook` + 실제 DOM 노드 + `KeyboardEvent`
디스패치)을 따르고 `afterEach`에서 DOM/포커스 상태를 정리해 `isolate` 누수를 막으세요.
실제 레이아웃·가시성 기반 포커스 순서는 `packages/theme-eclipse`의 Playwright e2e 영역입니다.
