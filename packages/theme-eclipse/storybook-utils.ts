export function isDocsStory(): boolean {
  return globalThis.location.href.includes('--docs')
}
