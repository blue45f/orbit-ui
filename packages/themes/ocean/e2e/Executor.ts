import { Page, expect } from '@playwright/test'

/* eslint-disable @typescript-eslint/member-ordering */
class Busy {
  constructor(
    public pendingNetworkMap: Map<string, number>,
    public pendingDom: number,
  ) {}
}

export class PlayWrightExecutor {
  public isPageBusy: (() => Busy | PromiseLike<Busy>) | undefined

  constructor(private readonly page: Page) {}
  // 페이징의 모든 활동들(네트워크 요청, DOM 변경)을 추적한다. 진행중인 네트워크 요청, DOM 변경을 모두 센다.
  public async getIsPageBusyMethod(): Promise<() => Busy | PromiseLike<Busy>> {
    const busy = new Busy(new Map<string, number>(), 0)

    // 네트워크 요청을 추가한다.
    this.page.on('request', (request) => {
      const url = request.url()
      const networkCount = busy.pendingNetworkMap.get(url)
      if (!networkCount || networkCount === 0) {
        busy.pendingNetworkMap.set(url, 1)
      } else {
        busy.pendingNetworkMap.set(url, networkCount + 1)
      }
    })

    // 네트워크 요청이 완료되면 추적하던 네트워크 요청을 삭제한다.
    this.page.on('response', (response) => {
      const url = response.url()
      const networkCount = busy.pendingNetworkMap.get(url)
      if (networkCount === undefined) {
        return
      }
      if (networkCount <= 1) {
        busy.pendingNetworkMap.delete(url)
      } else {
        busy.pendingNetworkMap.set(url, networkCount - 1)
      }
    })

    // exposeFunction을 이용해 브라우저의 window 객체에 함수를 추가한다.
    await this.page.exposeFunction('__pwBusy__', (key: string) => {
      if (key === 'dom++') {
        busy.pendingDom += 1
      } else if (key === 'dom--') {
        busy.pendingDom -= 1
      }
    })

    await this.page.addInitScript(`{
      const _clearTimeout = window.clearTimeout;
      const _requestAnimationFrame = window.requestAnimationFrame;

      window.requestAnimationFrame = (callback) => {
        return 1;
      }

      new MutationObserver(() => {
        window.__pwBusy__("dom++");
        _requestAnimationFrame(() => { window.__pwBusy__("dom--"); });
      }).observe(document, { attributes: true, childList: true, subtree: true });

    }`)

    // 애니메이션과 caret을 없앤다.
    await this.page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        const style = document.createElement('style')
        style.textContent = `
                            /* Hide caret */
                            * { caret-color: transparent !important; }
                            /* Instant transitions and animations */
                            * > * { transition-duration: 0ms !important; animation-duration: 0ms !important; }
                          `
        document.head.appendChild(style)
      })
    })

    return async (): Promise<Busy> => {
      // network 와 CPU가 idle 상태인지 확인한다.
      await this.page.waitForLoadState('load')
      await this.page.waitForLoadState('networkidle')

      return busy
    }
  }

  private async checkIfPageIsBusy() {
    const timeout = Date.now() + 10000
    let isBusy: boolean
    let busy: Busy
    do {
      // 렌더링, 클릭 또는 마우스오버 활동에 대해 1초 동안 기본 대기 시간을 추가합니다.
      // 이상적으로는 요소가 표시될 때까지 기다렸다가 스크린샷을 찍는 방식으로 테스트를 작성해야 하지만 대부분의 테스트 사례에서는 이를 놓치고 있습니다.
      // 또한 일부 배경만 변경되는 호버 액티비티의 경우 테스트 작성자가 이러한 대기 메커니즘을 작성하기 어렵기 때문에 기본 1초 대기를 추가합니다.
      await this.page.waitForTimeout(1000)
      busy = await this.isPageBusy!()
      isBusy = busy.pendingNetworkMap.size + busy.pendingDom > 0
    } while (isBusy && Date.now() < timeout)

    if (isBusy) {
      if (busy.pendingNetworkMap.size > 0) {
        console.log(
          `네트워크 요청이 이루어지고 있습니다. URL = ${this.page.url()} 요청중인 URL 목록 = ${JSON.stringify(
            Array.from(busy.pendingNetworkMap),
          )}`,
        )
      } else if (busy.pendingDom > 0) {
        console.log(`DOM 변경이 이루어지고 있습니다. URL = ${this.page.url()}`)
      } else {
        console.log(`페이지가 스크린샷을 찍을 상황이 아닙니다. URL ${this.page.url()}`)
      }
    }
  }

  public async goto(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'networkidle',
    })
  }

  public async exposeFunction(): Promise<void> {
    this.isPageBusy = await this.getIsPageBusyMethod()
  }

  public async takeScreenshot(): Promise<void> {
    await this.checkIfPageIsBusy()
    return expect(this.page).toHaveScreenshot()
  }
}
