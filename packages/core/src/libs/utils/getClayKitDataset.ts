/**
 * UI Forge 익스텐션 컴포넌트 조회 용도의 데이터셋의 값을 반환
 * - `data-ui-forge-component="{componentName}"`
 */
// eslint-disable-next-line
export function getClayKitDataset(componentName: string, props: any): string {
  // 몰드에서 추가로 정의한 경우
  if ('data-ui-forge-component' in props) {
    return `${componentName}${props['data-ui-forge-component'] as string}`
  }

  return componentName
}
