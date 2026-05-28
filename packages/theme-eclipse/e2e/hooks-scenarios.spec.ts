import { test, expect } from '@playwright/test'

/**
 * End-to-end scenarios that drive the hooks live-demo stories through their
 * intended user flows. These complement the unit tests by exercising the
 * actual browser behavior (real keyboard, real focus, real scroll lock).
 *
 * Each scenario navigates to the matching Storybook story iframe and asserts
 * the observable DOM after a user interaction.
 */

const STORY = (id: string) =>
  `/iframe.html?args=&id=${encodeURIComponent(id)}&viewMode=story`

test.describe('Hooks · State', () => {
  test('useDisclosure: Open/Close/Toggle buttons drive isOpen readout', async ({ page }) => {
    await page.goto(STORY('hooks-state--disclosure'))

    const readout = page.locator('text=isOpen:').locator('strong')
    await expect(readout).toHaveText('false')

    await page.getByRole('button', { name: 'Open' }).click()
    await expect(readout).toHaveText('true')

    await page.getByRole('button', { name: 'Close' }).click()
    await expect(readout).toHaveText('false')

    await page.getByRole('button', { name: 'Toggle' }).click()
    await expect(readout).toHaveText('true')

    await page.getByRole('button', { name: 'Toggle' }).click()
    await expect(readout).toHaveText('false')
  })

  test('useToggle: implicit + explicit setters', async ({ page }) => {
    await page.goto(STORY('hooks-state--toggle'))

    const readout = page.locator('text=expanded:').locator('strong')
    await expect(readout).toHaveText('false')

    await page.getByRole('button', { name: 'Toggle' }).click()
    await expect(readout).toHaveText('true')

    await page.getByRole('button', { name: 'Force false' }).click()
    await expect(readout).toHaveText('false')

    await page.getByRole('button', { name: 'Force true' }).click()
    await expect(readout).toHaveText('true')

    // idempotent: setting true again keeps it true
    await page.getByRole('button', { name: 'Force true' }).click()
    await expect(readout).toHaveText('true')
  })

  test('useCounter: clamps at min/max and disables boundary buttons', async ({ page }) => {
    await page.goto(STORY('hooks-state--counter'))

    const minus = page.getByRole('button', { name: '−' })
    const plus = page.getByRole('button', { name: '+' })
    const reset = page.getByRole('button', { name: 'Reset' })
    const display = page.locator('text=isAtMin:').locator('..')

    // initial 1, increment to 5 (max)
    await plus.click()
    await plus.click()
    await plus.click()
    await plus.click()
    await expect(plus).toBeDisabled()
    await expect(display).toContainText('isAtMax: true')

    // reset to initial
    await reset.click()
    await expect(plus).toBeEnabled()

    // decrement to 0 (min)
    await minus.click()
    await expect(minus).toBeDisabled()
    await expect(display).toContainText('isAtMin: true')
  })

  test('useArray: chip toggles drive items list', async ({ page }) => {
    await page.goto(STORY('hooks-state--array'))

    const items = page.locator('text=items:').locator('..')
    // initial: items: ["최근"]
    await expect(items).toContainText('["최근"]')

    // toggle 최근 off
    await page.getByRole('button', { name: '최근' }).click()
    await expect(items).toContainText('items: []')

    // toggle 내 글 on
    await page.getByRole('button', { name: '내 글' }).click()
    await expect(items).toContainText('["내 글"]')

    // clear
    await page.getByRole('button', { name: 'Clear' }).click()
    await expect(items).toContainText('items: []')
  })

  test('useStep: next/prev/goTo drives current step', async ({ page }) => {
    await page.goto(STORY('hooks-state--step'))

    const status = page.locator('text=/step \\d\\/4/')
    await expect(status).toContainText('step 1/4')

    await page.getByRole('button', { name: '다음' }).click()
    await expect(status).toContainText('step 2/4')

    await page.getByRole('button', { name: '이전' }).click()
    await expect(status).toContainText('step 1/4')

    // goTo via tab buttons
    await page.getByRole('button', { name: '3. 결제' }).click()
    await expect(status).toContainText('step 3/4')

    // reset
    await page.getByRole('button', { name: 'Reset' }).click()
    await expect(status).toContainText('step 1/4')
  })
})

test.describe('Hooks · Interaction', () => {
  test('useHotkey: ⌘K and ⌘Enter increment respective counters', async ({ page, browserName }) => {
    await page.goto(STORY('hooks-interaction--hotkey'))

    // The hook normalises `mod` to `meta` on macOS, `ctrl` elsewhere.
    // Playwright fires real keyboard events; webkit reports as macOS, chromium as Linux in CI.
    // The hook handles both, but for the test we use a synthetic combo that matches.
    const isMac = browserName === 'webkit'
    const mod = isMac ? 'Meta' : 'Control'

    const k = page.locator('text=⌘K count').locator('..')
    await expect(k).toContainText('0')

    await page.keyboard.press(`${mod}+K`)
    await expect(k).toContainText('1')

    await page.keyboard.press(`${mod}+K`)
    await expect(k).toContainText('2')

    const enter = page.locator('text=⌘Enter count').locator('..')
    await page.keyboard.press(`${mod}+Enter`)
    await expect(enter).toContainText('1')
  })

  test('useOnClickOutside: clicking outside the dropdown closes it', async ({ page }) => {
    await page.goto(STORY('hooks-interaction--click-outside'))

    const trigger = page.getByRole('button', { name: '드롭다운 열기' })
    await trigger.click()
    await expect(page.getByText('옵션 1')).toBeVisible()

    // click outside the trigger + content
    await page.locator('text=Live demo').first().click()
    await expect(page.getByText('옵션 1')).not.toBeVisible()
  })

  test('useScrollLock: button locks body overflow', async ({ page }) => {
    await page.goto(STORY('hooks-interaction--scroll-lock'))

    const readout = page.locator('text=body.style.overflow').locator('..')
    await expect(readout).toContainText('(default)')

    await page.getByRole('button', { name: 'Lock body scroll' }).click()
    await expect(readout).toContainText('hidden')

    await page.getByRole('button', { name: 'Unlock' }).click()
    await expect(readout).toContainText('(default)')
  })
})

test.describe('Hooks · Environment', () => {
  test('useClipboard: copy button updates hasCopied state', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto(STORY('hooks-environment--clipboard'))

    const button = page.getByRole('button', { name: /복사/ })
    await expect(button).toHaveText('복사')

    await button.click()
    await expect(button).toHaveText('✓ 복사됨')

    // hasCopied auto-resets after 2000ms (default timeout)
    await expect(button).toHaveText('복사', { timeout: 4000 })
  })

  test('useDocumentTitle: input updates document title in real time', async ({ page }) => {
    await page.goto(STORY('hooks-environment--document-title'))

    await expect(page).toHaveTitle(/Orbit Hooks Demo · useDocumentTitle/)

    const input = page.locator('input[type="text"]')
    await input.fill('Custom · Test Title')
    await expect(page).toHaveTitle('Custom · Test Title')
  })

  test('useLocalStorage: writes persist in storage and survive reload', async ({ page }) => {
    await page.goto(STORY('hooks-environment--local-storage'))

    const textarea = page.locator('textarea')
    await textarea.fill('persistence-check-value')

    await page.reload()
    await expect(textarea).toHaveValue('persistence-check-value')

    await page.getByRole('button', { name: /Clear/ }).click()
    await expect(textarea).not.toHaveValue('persistence-check-value')
  })
})

test.describe('Hooks · Timing', () => {
  test('useDebounce: debounced value lags raw value by ~300ms', async ({ page }) => {
    await page.goto(STORY('hooks-timing--debounce'))

    const input = page.locator('input[type="text"]')
    await input.fill('hello')

    const raw = page.locator('text=raw').locator('..').locator('span').last()
    await expect(raw).toContainText('hello')

    // wait past the 300ms debounce window
    const debounced = page.locator('text=debounced').locator('..').locator('span').last()
    await expect(debounced).toContainText('hello', { timeout: 1500 })
  })

  test('useInterval: pause/resume controls the tick', async ({ page }) => {
    await page.goto(STORY('hooks-timing--interval'))

    const display = page.locator('text=/^\\d+s$/').first()
    await expect(display).toContainText('0s')

    // wait for ~2 ticks
    await page.waitForTimeout(2100)
    const text = await display.textContent()
    const before = parseInt(text?.replace('s', '') ?? '0', 10)
    expect(before).toBeGreaterThan(0)

    // pause and verify it stops increasing
    await page.getByRole('button', { name: 'Pause' }).click()
    await page.waitForTimeout(1500)
    const after = parseInt((await display.textContent())?.replace('s', '') ?? '0', 10)
    expect(after - before).toBeLessThanOrEqual(1) // small ambiguity tolerated for the in-flight tick
  })
})
