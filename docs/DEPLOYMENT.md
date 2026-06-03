# 배포 가이드 (Deployment)

이 문서는 Orbit UI의 **완전한 배포 형태**를 설명합니다. 이 저장소는 서버(백엔드)가 없는
**퍼블리시되는 디자인 시스템 라이브러리 + Storybook 정적 사이트** 구조입니다. 따라서
배포 티어는 두 가지입니다.

| 티어                | 산출물                                                               | 대상                    | 트리거                                                              |
| ------------------- | -------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------- |
| **패키지(npm)**     | `@heejun-com/core`, `@heejun-com/icons`, `@heejun-com/theme-eclipse` | npm 레지스트리 (public) | Changesets 릴리스 PR 머지 → `release.yml`                           |
| **문서(Storybook)** | `packages/theme-eclipse`의 `storybook-static`                        | Vercel 정적 호스팅      | `main` push (관련 패키지 변경 시) → `deploy-orbit-ui-storybook.yml` |

> **백엔드/서버 없음:** 이 저장소에는 NestJS/Node API나 동적 SSR 앱이 없습니다.
> `packages/theme-eclipse/src/server`는 Next.js 소비자용 RSC 호환 export일 뿐이며 별도
> 서버로 배포되지 않습니다. 그러므로 production Dockerfile / `render.yaml` / `fly.toml`은
> 대상에 해당하지 않으며 의도적으로 두지 않습니다. (라이브러리는 npm으로, 문서는 정적 호스팅으로 "배포"됩니다.)

---

## 1. 아키텍처: 어느 티어가 어디로 가는가

```
                       ┌──────────────────────────────────────────┐
   git push main ─────▶│ CI (.github/workflows/ci.yml)            │
                       │  · 빌드 및 테스트 (pnpm run verify)       │
                       │  · 린트 (pnpm lint)                       │
                       └───────────────┬──────────────────────────┘
                                       │ CI success (workflow_run)
                                       ▼
              ┌────────────────────────────────────────────────────────┐
              │ 릴리스 (.github/workflows/release.yml)                  │
              │  changesets/action:                                     │
              │   · 미적용 changeset 있음 → "버전 업데이트" PR 생성     │
              │   · 버전 PR이 머지되어 changeset 소진됨 → pnpm release  │
              │     = pnpm build && changeset publish  →  npm 레지스트리│
              └────────────────────────────────────────────────────────┘

   git push main ─────▶┌────────────────────────────────────────────────┐
   (packages/** 변경) │ Storybook 배포                                  │
                       │ (.github/workflows/deploy-orbit-ui-storybook)  │
                       │  vercel deploy --prod  →  Vercel 정적 호스팅   │
                       │  Production alias: https://orbit-ui-pink.vercel.app
                       └────────────────────────────────────────────────┘
```

- **퍼블리시 대상 패키지** (`"private": false`): `@heejun-com/core`, `@heejun-com/icons`,
  `@heejun-com/theme-eclipse`. 모두 `files: ["dist"]`만 배포하고 `access: public`
  (`.changeset/config.json`).
- **퍼블리시 제외 패키지** (`"private": true`): `@orbit-ui/vite-plugin`,
  `@orbit-ui/eslint-plugin`, `@orbit-ui/generator`. 빌드 도구/내부용이라 npm에 올라가지 않습니다.
- **Storybook**은 `theme-eclipse`에서 빌드되며 `core`의 primitive 스토리까지 포함합니다
  (`.storybook/main.ts`의 `../../core/src/**/primitives/**`).

---

## 2. 패키지 배포 (npm) — 라이브러리 릴리스 플로우

릴리스는 **Changesets** 기반입니다. 직접 `npm publish`하지 않고 PR 기반으로 버전을 올립니다.

### 2.1 개발자가 하는 일 (변경마다)

```bash
pnpm changeset          # 영향받는 패키지 선택 + bump(patch/minor/major) + 요약 작성
# → .changeset/<random-name>.md 가 생성됨. 이 파일을 PR에 포함해 머지.
```

변경 PR이 `main`에 머지되면 자동 흐름이 시작됩니다(아래).

### 2.2 자동 흐름 (`release.yml`)

1. `main`에서 **CI**가 성공하면 `workflow_run`으로 **릴리스** 워크플로가 트리거됩니다.
2. `changesets/action@v1`이 미적용 changeset을 감지하면 **"chore: 버전 업데이트" PR**을 만듭니다
   (각 package.json 버전 bump + CHANGELOG 갱신, `scripts/changelog-formatter.js` 포맷).
3. 그 **버전 PR을 머지**하면 다시 CI→릴리스가 돌고, 이번엔 적용할 changeset이 없으므로
   `publish: pnpm release`가 실행됩니다.
   - `pnpm release` = `pnpm build && changeset publish` → 변경된 `@heejun-com/*` 패키지를
     npm에 **public** 으로 publish.

### 2.3 정확한 명령 (수동/로컬 비상용)

CI가 정상 동작하면 수동 publish는 필요 없습니다. 단, 비상 시:

```bash
pnpm install --frozen-lockfile
pnpm changeset version     # 로컬에서 버전 bump 적용 (= pnpm run version)
pnpm release               # pnpm build && changeset publish (NPM_TOKEN 인증 필요)
```

> npm 2FA가 켜져 있으면 CI 자동 publish가 막힙니다. CI publish에는 **Automation 토큰**
> (또는 2FA-우회 가능한 Granular Access 토큰)을 사용하세요.

---

## 3. Storybook 배포 (Vercel) — 정적 문서 사이트

### 3.1 자동 배포 (`deploy-orbit-ui-storybook.yml`)

- 트리거: `main`으로 push되고 `packages/**` 또는 워크스페이스 매니페스트가 변경될 때
  (+ `workflow_dispatch` 수동 실행).
- **토큰 가드**: `secrets.VERCEL_TOKEN`이 비어 있으면 모든 배포 스텝을 건너뜁니다
  ("VERCEL_TOKEN is not configured; skipping..."). 즉 토큰 미설정 환경에서도 워크플로는
  실패하지 않고 **noop**으로 통과합니다.
- 배포 명령(워크플로 내부):
  ```bash
  cd packages/theme-eclipse
  vercel deploy --prod --confirm --token "$VERCEL_TOKEN"
  ```

### 3.2 빌드 구성 (`packages/theme-eclipse/vercel.json`)

Vercel은 모노레포 루트의 워크스페이스 의존성을 먼저 빌드한 뒤 Storybook을 빌드합니다.

```jsonc
{
  // 루트로 올라가 의존 패키지(vite-plugin → icons → core)를 순서대로 빌드
  "installCommand": "cd ../.. && pnpm install && pnpm --filter @orbit-ui/vite-plugin build && pnpm --filter @heejun-com/icons build && pnpm --filter @heejun-com/core build",
  "buildCommand": "pnpm build:storybook", // storybook build → storybook-static
  "outputDirectory": "storybook-static",
}
```

- Vercel **Project Root Directory** = `packages/theme-eclipse` (대시보드 설정).
- Vercel 프로젝트: `prj_1nZ11Q8y0tY9kXxnVoML4zMWErBg` (org `team_dg5OVFLn94ulQlBfDX0yOHhA`,
  `.vercel/project.json`).
- **Production alias:** https://orbit-ui-pink.vercel.app

### 3.3 수동 배포 (모노레포 루트에서)

```bash
# 저장소 루트에서 실행 (Vercel이 Root Directory 설정을 서버 측에서 재적용)
vercel deploy . --prod -y --scope blue45fs-projects

# 확인 (alias는 자동 갱신):
vercel ls --scope blue45fs-projects | head -5      # "● Ready" 확인
```

> 주의: `cd packages/theme-eclipse`(혹은 `storybook-static`)로 들어가 배포하지 마세요.
> Vercel이 Root Directory를 다시 적용해 경로가 어긋납니다. `vercel deploy`에는 `--project`
> 플래그가 없으며, 어느 프로젝트로 가는지는 루트의 `.vercel/project.json`이 결정합니다.
> 무료 티어 한도: 100 배포/일.

---

## 4. Preview vs Production

|               | Preview                                                                                                                       | Production                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **패키지**    | PR에서는 publish 안 함 (CI는 빌드/테스트만). Changesets는 머지 후에만 버전 PR/publish.                                        | `main` 머지 → 버전 PR 머지 → `changeset publish`. (사전 릴리스는 `2.0.0-beta.x` dist-tag/버전으로 관리) |
| **Storybook** | `deploy` 워크플로는 `main` push에만 동작. Vercel Git 연동이 켜져 있으면 PR 프리뷰 URL이 별도로 생성될 수 있음(대시보드 설정). | `vercel deploy --prod` → production alias 갱신                                                          |

PR 단계에서는 `e2e.yml`이 Storybook을 빌드하고 Playwright(시나리오 + 비주얼 회귀)를
chromium/webkit으로 검증합니다(배포는 하지 않음).

---

## 5. 필요한 환경 변수 / GitHub Secrets

| Secret           | 사용 워크플로                   | 용도                  | 없으면                                                                          |
| ---------------- | ------------------------------- | --------------------- | ------------------------------------------------------------------------------- |
| `NPM_TOKEN`      | `release.yml`                   | npm publish 인증      | publish 단계 실패(빌드/테스트는 통과). Automation/Granular 토큰 권장            |
| `VERCEL_TOKEN`   | `deploy-orbit-ui-storybook.yml` | Vercel CLI 배포       | **배포 스텝 전체 skip(noop 통과)** — 라이브러리/문서가 갱신돼도 사이트는 그대로 |
| `GITHUB_TOKEN`   | `release.yml` 등                | 버전 PR 생성 등       | 기본 제공(설정 불필요)                                                          |
| `GH_ADMIN_TOKEN` | `branch-protection.yml`         | `main` 보호 규칙 적용 | 보호 적용 실패(수동 실행 시)                                                    |

> CI 배포 스텝은 **secret 없이는 건너뛰므로**, 신규 환경에서는 아래 §6 수동 단계를 한 번
> 수행해야 실제 배포가 시작됩니다.

---

## 6. 메인테이너 수동 설정 (대시보드/일회성)

CI는 secret이 없으면 배포를 skip하므로, 처음 배포를 살리려면 다음을 직접 해야 합니다.

1. **npm**
   - npm org/패키지(`@heejun-com/*`) publish 권한 확보, **public** 스코프 확인.
   - npm에서 **Automation access token** 발급 → GitHub repo Secrets에 `NPM_TOKEN`으로 등록.
2. **Vercel**
   - Vercel 프로젝트(`orbit-ui`) 생성/연결, **Root Directory = `packages/theme-eclipse`** 설정.
   - Vercel 계정에서 토큰 발급 → GitHub repo Secrets에 `VERCEL_TOKEN`으로 등록.
   - (선택) 로컬 수동 배포를 쓰려면 `vercel link`로 루트에 `.vercel/project.json`을 둠.
3. **브랜치 보호(선택)**
   - Administration write 권한의 fine-grained token을 `GH_ADMIN_TOKEN`으로 등록 후
     **Branch protection** 워크플로를 수동 실행. 필수 체크: `빌드 및 테스트`, `린트`,
     `CodeRabbit review gate` (strict = up-to-date), 대화 해결 필수.

---

## 7. 배포 전 로컬 검증 (게이트)

```bash
pnpm install --frozen-lockfile
pnpm run verify     # = validate:architecture && format:check && lint && typecheck && build && test
```

이 게이트가 통과해야 CI도 통과합니다(`pre-push` 훅도 동일 `verify` 실행, 약 3분, 전 패키지).
ESLint는 `--max-warnings 0`이라 경고 1건도 push를 막습니다.

Storybook 산출물만 확인하려면:

```bash
pnpm -r build
pnpm --filter @heejun-com/theme-eclipse build:storybook   # → storybook-static/
```
