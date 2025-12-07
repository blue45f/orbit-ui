#!/bin/bash

# 1. husky가 설치되어 있으면 install
if [[ -x "$(command -v husky)" ]]; then husky install; fi

# 2. vite-plugin이 아직 빌드되지 않았다면 먼저 빌드
if [[ ! -d ./packages/vite-plugin/dist ]]; then
  pnpm --filter @prism-ui/vite-plugin build
fi

# 3. core 패키지가 아직 빌드되지 않았다면 빌드
if [[ ! -d ./packages/core/dist ]]; then
  pnpm --filter @prism-ui/core build
fi

# 4. icons 패키지가 아직 빌드되지 않았다면 빌드
if [[ ! -d ./packages/icons/dist ]]; then
  pnpm --filter @prism-ui/icons build
fi
