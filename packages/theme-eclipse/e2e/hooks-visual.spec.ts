import { test } from '@playwright/test'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import storyList from '../storybook-static/index.json' assert { type: 'json' }

import { PlayWrightExecutor } from './Executor'

/**
 * Visual regression for hooks live demos.
 *
 * Each demo is rendered in isolation, network/DOM idle is awaited, animations
 * and caret are suppressed by PlayWrightExecutor, and an initial-state
 * screenshot is taken. Demos that rely on timing (Interval, lifecycle logs)
 * are excluded because their first paint includes timestamps that drift
 * between runs.
 */

const HOOKS_STORY_PATTERN = /^hooks-(state|interaction|environment|observer)--[a-z-]+$/

const TIMING_DEPENDENT = new Set<string>([
  // Lifecycle: log lines have ISO timestamps
  'hooks-lifecycle--mount',
  'hooks-lifecycle--unmount',
  'hooks-lifecycle--update-effect',
  // Timing: counters/intervals drift
  'hooks-timing--interval',
  'hooks-timing--latest',
  // Window/screen-dependent
  'hooks-environment--window-size',
  'hooks-environment--media-query',
])

const visualStoryIds = Object.keys(storyList.entries)
  .filter((id) => HOOKS_STORY_PATTERN.test(id))
  .filter((id) => !TIMING_DEPENDENT.has(id))

test.describe('Hooks visual regression', () => {
  visualStoryIds.forEach((id) => {
    test(`${id}`, async ({ page }) => {
      const executor = new PlayWrightExecutor(page)
      await executor.exposeFunction()
      await executor.goto(`/iframe.html?args=&id=${encodeURIComponent(id)}&viewMode=story`)
      await executor.takeScreenshot()
    })
  })
})
