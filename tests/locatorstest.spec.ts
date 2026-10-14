import { expect, test } from "@playwright/test";
test.beforeEach(async ({page}) => {
    await page.goto('https://playground.bondaracademy.com/'); //this opens the given website in the browser
    await page.getByText('Forms').click(); //looks for an element containing the text form
    await page.getByText('Form Layouts').click(); //finds form layouts and clicks it
})

test('user-visible locators', async ({page})=> {
    await page.getByRole('button', {name: 'Sign in'}).first().click();
    await page.getByRole('textbox', {name: 'Email'}).first().fill('megu@gmail.com');
    await page.getByLabel('Email').first().fill('test@test.com');
    await page.getByPlaceholder('Jane Doe').fill('megna k');
    await page.getByText('Submit').first().click();
    await page.getByTestId('inputEmail1').fill('test@gmail.com');
    await page.getByTitle('IoT Dashboard').click();
})

test('Locationg child elements', async ({page}) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text("Option 1")').click();
    await page.locator('nb-card nb-radio-group :text("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click(); //NR
})

test('Locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('button').click();
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('button').click();
    await page.locator('nb-card').filter({hasText: 'Using the Grid'}).getByRole('button').click();

    await page.locator('nb-card')
    .filter({has: page.locator('nb-checkbox')})
    .filter({hasText: 'Sign in'})
    .getByLabel('Email')
    .fill('meg@gmail.com');

    await page.getByText('Using the Grid').locator('..').getByRole('button').click();
})

/*test('Reusing locators', async ({ page }) => {
  await page
    .locator('nb-card', { hasText: 'Basic form' })
    .getByLabel('Email')
    .fill('test@test.com');

  await page
    .locator('nb-card', { hasText: 'Basic form' })
    .getByLabel('Password')
    .fill('playwright');

  await page
    .locator('nb-card', { hasText: 'Basic form' })
    .locator('nb-checkbox')
    .click();

  await page
    .locator('nb-card', { hasText: 'Basic form' })
    .getByRole('button')
    .click();
});*/

test('Reusing locators', async ({ page }) => {
  const basicFormSection = page.locator('nb-card', { hasText: 'Basic form' })
  const emailInputField = basicFormSection.getByLabel('Email')

  await emailInputField.fill('test@test.com')
  await basicFormSection.getByLabel('Password').fill('playwright')
  await basicFormSection.locator('nb-checkbox').click()
  await basicFormSection.getByRole('button').click()

  await expect(emailInputField).toHaveValue('test@test.com')
});

test('Extracting values', async ({ page }) => {
  // extracting text
  const basicFormSection = page.locator('nb-card', { hasText: 'Basic form' })

  const submitButtonText = await basicFormSection
    .getByRole('button')
    .textContent()
  expect(submitButtonText).toEqual('Submit')

  // extract multiple text values
  const allRadioButtonValues = await page
    .locator('nb-radio')
    .allTextContents()
  expect(allRadioButtonValues).toContain('Option 1')

  // extract input field values
  const emailField = basicFormSection.getByRole('textbox', { name: 'Email' })
  await emailField.fill('test@test.com')
  const emailFieldValue = await emailField.inputValue()
  console.log(emailFieldValue)

  // extract attribute value
  const emailPlaceholder = await emailField.getAttribute('placeholder')
  console.log(emailPlaceholder)
})

test('Assertions', async ({ page }) => {
  const basicFormSectionButton = page
    .locator('nb-card', { hasText: 'Basic form' })
    .getByRole('button')

  // Generic assertions
  const value = 5
  expect(value).toEqual(5)

  // Locator assertions
  const submitButtonText = await basicFormSectionButton.textContent()
  expect(submitButtonText).toEqual('Submit')

  // Locator assertion
  await expect(basicFormSectionButton).toHaveText('Submit')

  // Soft assertion
  await expect.soft(basicFormSectionButton).toHaveText('Submit')

  await basicFormSectionButton.click()
})