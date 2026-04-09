import path from 'path'

const LAST_NAME = 1

/**
 * @description
 * 프로젝트 이름과 파일 경로의 마지막 부분을 조합하여 파일 이름 세그먼트를 생성합니다.
 *
 * depth 매개변수는 반환할 경로 세그먼트의 깊이를 지정합니다.
 *
 * @example
 * `/User/username/project/src/components/Button/Button.css.ts` -> `project/.../Button.css.ts`
 */
export const getFilenameSegment = (root: string, id: string, depth = LAST_NAME): string => {
  const project = path.basename(path.resolve(root))
  // NOTE: 윈도우 환경에서도 작동하도록 path.relative 사용
  const relativePath = path.relative(root, id)
  const parts = relativePath.split(path.sep).filter(Boolean)
  return `${project}/.../${parts.slice(-depth).join('/')}`
}
