# 보안 정책

Orbit UI를 사용하시는 분들의 안전을 위해 보안 취약점은 비공개 채널로 신고해 주세요.

## 지원 버전

`@heejun-com/theme-eclipse`, `@heejun-com/core`, `@heejun-com/icons` 의 다음 릴리스 라인이 보안 패치 대상입니다.

| 패키지 | 지원 라인 |
|---|---|
| theme-eclipse | 2.x (현재 메이저), 1.x (LTS, 2027-05-31 까지) |
| core | 2.x |
| icons | 2.x |

이외 릴리스 라인은 사례별 우선순위로 검토합니다.

## 취약점 신고

GitHub Security Advisory(권장)나 비공개 이메일로 알려주세요.

- **GitHub Security**: [Report a vulnerability](https://github.com/blue45f/orbit-ui/security/advisories/new)
  - 가장 빠르게 조치 가능합니다. CVE 발급도 함께 진행합니다.
- **이메일**: `blue45f@gmail.com` (제목 `[orbit-ui security]` 접두)
  - PoC, 영향 범위, 재현 환경을 포함해 주세요.

공개 이슈로 보안 결함을 신고하면 다른 사용자가 노출되므로 위 채널을 사용해 주세요.

## 처리 절차

1. **접수** — 영업일 기준 2일 이내 1차 응답.
2. **트리아지** — 영향 범위와 심각도(CVSS v3 기준) 확정. 7일 이내 진단 결과 공유.
3. **수정 및 검증** — 패치 작성, 비공개 PR로 리뷰. 영향받는 모든 지원 라인에 백포트.
4. **공개 릴리스** — 패치 버전 릴리스 후 GitHub Security Advisory 공개 + CHANGELOG에 명시.

심각도가 높은(Critical · High) 취약점은 평균 14일 이내 패치를 목표로 합니다.

## 감사

책임감 있게 신고해 주신 분은 동의하에 GitHub Security Advisory와 릴리스 노트에 크레딧을 표기합니다.
