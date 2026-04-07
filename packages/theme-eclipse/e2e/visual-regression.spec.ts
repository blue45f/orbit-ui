import { test } from '@playwright/test'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import storyList from '../storybook-static/index.json' assert { type: 'json' }

import { PlayWrightExecutor } from './Executor'

const IGNORED_STORY_REGEX = /(public-loading)/

const qaStoryIds = Object.keys(storyList.entries)
  .filter((key) => /eclipse-.*--디자인qa/.test(key))
  .filter((key) => !IGNORED_STORY_REGEX.test(key))

qaStoryIds.forEach((id) => {
  test(`${id}`, async ({ page }) => {
    const executor = new PlayWrightExecutor(page)
    await executor.exposeFunction()
    await executor.goto(`/iframe.html?args=&id=${encodeURIComponent(id)}&viewMode=story`)
    await executor.takeScreenshot()
  })
})
