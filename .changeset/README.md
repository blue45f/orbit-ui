# Changesets

이 폴더는 `@changesets/cli`에 의해 자동 생성되었습니다.

## 사용 방법

### Changeset 추가

새로운 변경사항이 있을 때 changeset을 추가합니다:

```bash
pnpm changeset
```

프롬프트에 따라:
1. 변경된 패키지 선택
2. 버전 유형 선택 (patch/minor/major)
3. 변경 내용 요약 작성

### 버전 유형

| 유형 | 설명 | 예시 |
|------|------|------|
| **patch** | 버그 수정, 문서 수정 | 1.0.0 → 1.0.1 |
| **minor** | 새로운 기능 추가 | 1.0.0 → 1.1.0 |
| **major** | Breaking Change | 1.0.0 → 2.0.0 |

### 파일 구조

```
.changeset/
├── config.json           # Changeset 설정
├── README.md             # 이 문서
└── *.md                  # 개별 changeset 파일들
```

## 참고 문서

- [Changesets 문서](https://github.com/changesets/changesets)
- [자주 묻는 질문](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
