import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/')
  await page.getByText('Modal & Overlays').click()
  await page.getByText('Dialog').click()
})

test('Auto waiting', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', {
    hasText: 'Open Dialog With Delay'
  })

  await dialogWithDelayForm
    .getByRole('button', { name: '3 seconds' })
    .click()

  const dialogContainer = page.locator('nb-dialog-container')

  // await dialogContainer.getByRole('button', { name: 'Ok' }).click()

  // const dialogHeaderText = await dialogContainer
  //   .locator('nb-card-header')
  //   .textContent()

  const dialogHeaderText = await dialogContainer
    .locator('nb-card-header')
    .allTextContents()

  expect(dialogHeaderText).toEqual(['Friendly reminder'])
})

test('Alternative waits', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', {
    hasText: 'Open Dialog With Delay'
  })

  await dialogWithDelayForm
    .getByRole('button', { name: '3 seconds' })
    .click()

  const dialogContainer = page.locator('nb-dialog-container')

  // Wait for the element
  // await dialogContainer.waitFor()
  // await page.waitForSelector('nb-dialog-container')

  // Wait for API response
  // await page.waitForResponse('**/delay/*')

  // Wait for load state (NOT RECOMMENDED)
  // await page.waitForLoadState('networkidle')

  // Hardcoded wait (NEVER USE IT)
  // await page.waitForTimeout(3500)

  // const dialogHeaderText = await dialogContainer
  //   .locator('nb-card-header')
  //   .allTextContents()

  // expect(dialogHeaderText).toContain('Friendly reminder')

  await expect(dialogContainer.locator('nb-card-header'))
    .toHaveText('Friendly reminder')
})

test('Timeouts', async ({ page }) => {
    const dialogWithDelayForm = page.locator('nb-card', {
        hasText: 'Open Dialog With Delay'
    });

    await dialogWithDelayForm.getByRole('button', {
        name: '3 seconds'
    }).click();

    const dialogContainer = page.locator('nb-dialog-container');

    await dialogContainer.getByRole('button', {
        name: 'OK'
    }).click({ timeout: 4000 });
});