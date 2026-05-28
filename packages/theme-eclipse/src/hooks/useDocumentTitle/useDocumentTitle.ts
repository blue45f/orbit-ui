import { useEffect } from 'react'

export type UseDocumentTitleOptions = {
  /**
   * unmount 시 이전 title로 복원할지 여부. SPA 내 페이지 전환에서 유용.
   * @defaultValue true
   */
  restoreOnUnmount?: boolean
}

/**
 * `document.title`을 React state로 다룹니다. SPA 페이지 단위 title 설정에 사용.
 *
 * unmount 시 자동 복원 (옵션). SSR 안전 (서버에서는 no-op).
 *
 * @example
 * ```tsx
 * function ProjectPage({ project }: { project: Project }) {
 *   useDocumentTitle(`${project.name} · Orbit`)
 *   return <Layout>...</Layout>
 * }
 * ```
 */
export function useDocumentTitle(title: string, options: UseDocumentTitleOptions = {}): void {
  const { restoreOnUnmount = true } = options

  useEffect(() => {
    if (typeof document === 'undefined') return
    const previous = document.title
    document.title = title
    if (!restoreOnUnmount) return
    return () => {
      document.title = previous
    }
  }, [title, restoreOnUnmount])
}
