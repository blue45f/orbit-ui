#!/bin/bash

# 1. husky가 설치되어 있으면 install
if [[ -x "$(command -v husky)" ]]; then husky install; fi

# 2. vite-plugin이 아직 빌드되지 않았다면 먼저 빌드
if [[ ! -d ./tools/vite-plugin/dist ]]; then
  pnpm --filter @clay-kit/vite-plugin build
fi

# 3. foundation 패키지가 아직 빌드되지 않았다면 빌드
if [[ ! -d ./packages/foundation/dist ]]; then
  pnpm --filter @clay-kit/foundation build
fi

# 4. icons 패키지가 아직 빌드되지 않았다면 빌드
if [[ ! -d ./packages/icons/dist ]]; then
  pnpm --filter @clay-kit/icons build
fi
