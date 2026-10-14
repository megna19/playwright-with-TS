import { test, expect } from '@playwright/test';
const { readFileSync } = require('fs');
let testDataJson = 'tests/submit-business.json';  

/*right click on the file --> copy relative path*/

test('test', async ({ page }) => {

  //load test data json
  let testData = readFileSync(testDataJson);
  var testDataJObj = JSON.parse(testData);

  await page.goto('https://playground.bondaracademy.com/pages/forms/layouts');

  await page.getByTestId('inputEmail1').click();
  await page.getByTestId('inputEmail1').fill(testDataJObj.inputemail);

  await page.locator('#inputPassword2').click();
  await page.locator('#inputPassword2').fill(testDataJObj.inputPassword);

  await page.locator('nb-card').locator('nb-radio-group').locator(':text("Option 1")').click();
  await page.locator('nb-card nb-radio-group :text("Option 2")').click()
  await page.locator('nb-card').filter({ hasText: 'Using the' }).getByRole('button').click();

});