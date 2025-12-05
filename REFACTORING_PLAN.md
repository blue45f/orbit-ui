# 🔄 Component v2 전면 리팩토링 계획

## 📋 작업 개요

전체 프로젝트를 클린하게 재구성하고, 회사 특정 코드를 제거하며, 오픈소스 프로젝트로 전환합니다.

---

## 🎯 1단계: 네이밍 재정의

### 현재 구조 → 새로운 구조

```
현재 이름              새 이름                역할
─────────────────────────────────────────────────────────────
@clay-kit           → @ui-forge             프로젝트 전체 네임스페이스

packages/foundation → packages/core          핵심 기능 컴포넌트 (스타일 미적용)
packages/clay/mint  → packages/themes/ocean  테마 적용 컴포넌트
packages/icons      → packages/icons         아이콘 컴포넌트 (유지)

mold 폴더           → composites            복합 컴포넌트
```

### 패키지명 변경
- `@clay-kit/foundation` → `@ui-forge/core`
- `@clay-kit/mint` → `@ui-forge/theme-ocean`
- `@clay-kit/icons` → `@ui-forge/icons`

---

## 🏢 2단계: 회사 특정 코드 제거/대체

### 제거 대상 아이콘
```
❌ TossIcon, BmartIcon, CircleBmartIcon
❌ AltteulPassIcon, AltteulDeliveryIcon
❌ HanjipDeliveryIcon, ShopDeliveryIcon
❌ SafetycallIcon
❌ PaycoIcon, PaycoSquareIcon
❌ NaverIcon, KakaoIcon (소셜 로그인용)
```

### 대체 방안
- 범용 아이콘으로 대체 (GenericStoreIcon, DeliveryIcon 등)
- 또는 완전 제거

---

## 🧹 3단계: 코드 품질 개선

### TypeScript/Lint 오류 수정
- [ ] 모든 타입 에러 해결
- [ ] ESLint 경고 해결
- [ ] Unused imports 제거

### 코드 리팩토링
- [ ] 중복 코드 제거
- [ ] 불필요한 의존성 제거
- [ ] 성능 최적화
- [ ] 접근성 개선

### 불필요한 파일 삭제
- [ ] `.gitlab-ci.yml` 및 GitLab 관련 파일
- [ ] 회사 특정 설정 파일
- [ ] 사용하지 않는 예제 파일

---

## 📚 4단계: 문서 재작성

### README.md (한글)
```markdown
# 🎨 UI Forge

> 현대적인 React 디자인 시스템 컴포넌트 라이브러리

## 특징
- Figma 디자인 토큰 연동
- 완전한 TypeScript 지원
- 접근성 준수 (WAI-ARIA)
- Tree-shaking 지원

## 설치
pnpm add @ui-forge/theme-ocean

## 사용법
...
```

### 추가 문서
- [ ] CONTRIBUTING.md (한글)
- [ ] ARCHITECTURE.md (아키텍처 설명)
- [ ] MIGRATION_GUIDE.md (마이그레이션 가이드)

---

## 🔨 5단계: Git 히스토리 초기화

```bash
# 1. 백업
git branch backup-original

# 2. 새 브랜치에서 초기 커밋 생성
git checkout --orphan main-new
git add -A
git commit -m "Initial commit: UI Forge Design System"

# 3. 기존 main 대체
git branch -D main
git branch -m main
```

---

## ✅ 6단계: 검증

- [ ] 모든 패키지 빌드 성공
- [ ] TypeScript 에러 0개
- [ ] Lint 에러 0개
- [ ] 테스트 통과
- [ ] Storybook 정상 작동
- [ ] 디자인 깨짐 없음

---

## 📦 예상 변경 파일 수

- 수정: ~500 files
- 삭제: ~100 files
- 신규: ~20 files

---

## ⏱️ 예상 소요 시간

전체 작업을 단계별로 나누어 진행할 경우:
- 1단계 (네이밍): 30분
- 2단계 (회사코드 제거): 20분
- 3단계 (품질개선): 1시간
- 4단계 (문서화): 30분
- 5단계 (Git 초기화): 10분
- 6단계 (검증): 30분

**총 예상 시간: 약 3시간**

---

## ⚠️ 주의사항

1. **백업 필수**: 작업 전 반드시 백업
2. **단계별 진행**: 한 번에 모든 것을 변경하지 말고 단계별로 진행
3. **검증 필수**: 각 단계마다 빌드 및 테스트 확인
4. **문서 우선**: 코드 수정 전 새로운 구조를 문서화

---

## 🚦 진행 상태

- [ ] 1단계: 네이밍 재정의
- [ ] 2단계: 회사 특정 코드 제거
- [ ] 3단계: 코드 품질 개선
- [ ] 4단계: 문서 재작성
- [ ] 5단계: Git 히스토리 초기화
- [ ] 6단계: 최종 검증

---

작성일: 2024-12-05
