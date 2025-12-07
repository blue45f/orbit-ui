/**
 * Prism UI 익스텐션 컴포넌트 조회 용도의 데이터셋의 값을 반환
 * - `data-prism-ui-component="{componentName}"`
 */
// eslint-disable-next-line
export function getUIForgeDataset(componentName: string, props: any): string {
  // 컴포짓에서 추가로 정의한 경우
  if ('data-prism-ui-component' in props) {
    return `${componentName}${props['data-prism-ui-component'] as string}`
  }

  return componentName
}
