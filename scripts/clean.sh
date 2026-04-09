#!/bin/bash

set -e # 오류 발생 시 스크립트 중단
set -o pipefail

echo "[Start] 🧹 모노레포 정리 스크립트"

# 옵션 처리
DEFAULT=false # 기본 옵션. 하드코딩된 디렉토리 삭제
DRY_RUN=false # 실제 삭제 대신 dry-run 모드
DELETE_STORE=false # pnpm store 삭제 여부

# 명시적으로 삭제할 디렉토리들
HARDCODED_DIRS=(
  "node_modules"
  ".next"
  "dist"
  "out"
  "storybook-static"
  # ".turbo"는 아래에서 별도 처리
)

for arg in "${1:-"default"}"; do
  case "$arg" in
    default)
      DEFAULT=true
      ;;
    dry)
      DRY_RUN=true
      ;;
    store)
      DELETE_STORE=true
      ;;
    *)
      echo "❓ 알 수 없는 옵션: $arg"
      echo "   사용법: pnpm clean [dry|store] [option]"
      exit 1
      ;;
  esac
done

if $DELETE_STORE; then
  # pnpm store 삭제 #################################################
  OPTION=${2:-"prune"}; # "prune"(default) or "delete"
  if [[ "$OPTION" != "delete" && "$OPTION" != "prune" ]]; then
    echo "❗️ 잘못된 옵션입니다($OPTION). 'delete' 또는 'prune'만 허용됩니다."
    exit 1
  fi
  echo "📦 pnpm store를 정리합니다($OPTION)..."
  if [[ $OPTION == "delete" ]]; then
    # delete는 store 자체를 삭제하므로 이후 pnpm install시 원격지에서 다시 다운로드한다.
    pnpm_store_path=$(pnpm store path)
    if [[ $pnpm_store_path ]]; then
      rm -rf "$(pnpm store path)"
    else 
      echo "❗️ pnpm store 경로를 찾을 수 없습니다. 스토어를 수동으로 삭제 해주세요(~/.pnpm-store)."
      exit 1
    fi
  else
    # prune은 store 캐시만 삭제한다.
    pnpm store prune
  fi
else
  # 하드코딩된 디렉토리 정리 #################################################
  echo "🔍 하드코딩된 디렉토리 정리 중($arg)..."

  filter_unique_paths() {
    awk '
    {
      for (i in seen) {
        if (index($0, seen[i]) == 1 && $0 != seen[i]) {
          next
        }
      }
      seen[++n] = $0
      print $0
    }'
  }

  # HARDCODED_DIRS 내에서 실제 존재하는 경로만 수집
  UNIQUE_PATHS=$(for dir in "${HARDCODED_DIRS[@]}"; do
    find . -type d -name "$dir" -prune 2>/dev/null
  done | sort | filter_unique_paths)
  TARGET_PATHS="$UNIQUE_PATHS"

  # 삭제 혹은 dry-run
  while IFS= read -r path; do
    if [[ -d "$path" ]]; then
      if $DRY_RUN; then
        echo "[DRY-RUN] 삭제 예정: $path"
      else
        echo "🗑️ 삭제: $path"
        rm -rf "$path"
      fi
    fi
  done <<< "$TARGET_PATHS"
fi

echo "✅ 정리 완료"
