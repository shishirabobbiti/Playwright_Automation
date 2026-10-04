const { expect } = require('@playwright/test');
const { customTest } = require("../Utils/Fixtures.js");

customTest('Fixtures Demo', async ({ authenticatedPage, createOrder }) => {

    await authenticatedPage.goto(
        'https://rahulshettyacademy.com/client'
    );

    await authenticatedPage .locator("//button[@routerlink='/dashboard/myorders']") .click();

    await authenticatedPage.locator("tbody").waitFor();

    await expect(
        authenticatedPage.getByText(createOrder.orderId)
    ).toBeVisible();

});