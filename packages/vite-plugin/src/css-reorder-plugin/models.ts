export type CssReorderPluginOptions = {
  /**
   * @description
   * 우선순위에 따라 정렬할 CSS 파일의 키워드 목록입니다.
   * 이 목록에 있는 키워드가 포함된 CSS 블록이 우선적으로 정렬됩니다.
   *
   * @example ['global.css', 'reset.css.ts', 'shared.css.ts']
   */
  priorityList: string[]
  /**
   * @description
   * style.css의 뱅 주석(`/*!`)를 제거할지 여부입니다. 기본값은 `false`이며, 주석을 유지합니다.
   *
   * 이는 CSS 우선순위를 디버깅할 때 유용합니다.
   * @default false
   */
  removeBangComment?: boolean
}
