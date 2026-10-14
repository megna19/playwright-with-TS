import { test } from "@playwright/test";
test.beforeEach(async ({page}) => {
    await page.goto('https://playground.bondaracademy.com/'); //this opens the given website in the browser
    await page.getByText('Forms').click(); //looks for an element containing the text form
    await page.getByText('Form Layouts').click(); //finds form layouts and clicks it
})

test('Locator syntax rule', async ({page}) =>{
    //find by tag
    page.locator('input');

    //find by Id
    page.locator('#inputEmail1')

    //find by class value
    page.locator('.shape-rectangle')

    //find by any attribute
    page.locator('[placeholder="Email"]')

    //find by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //find by several selectors
    page.locator('input[placeholder="Email"].shape-rectangle')

    //find by xpath id (not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //find by partial text match
    page.locator(':text("Using")')

    //find by exact text match
    page.locator(':text-is("Using the grid")')
})

