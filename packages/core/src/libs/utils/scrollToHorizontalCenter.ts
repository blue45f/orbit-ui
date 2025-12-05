export function scrollToHorizontalCenter(target: HTMLElement, container: HTMLElement): void {
  const targetCenterX = target.offsetLeft + target.offsetWidth / 2
  const containerCenterX = container?.offsetWidth / 2

  const left = targetCenterX - containerCenterX

  container.scroll({
    left,
    behavior: 'smooth',
  })
}
