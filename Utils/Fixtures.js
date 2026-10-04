const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APIUtils } = require('./APIUtils');

const loginpayload = {
    userEmail: "shishira@gmail.com",
    userPassword: "Ilovemymom@143"
};

const orderpayload = {
    orders: [
        {
            country: "Australia",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
};

exports.customTest = base.test.extend({

    authenticatedPage: async ({ browser }, use) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

        await page.locator("//input[@id='userEmail']").fill('shishira@gmail.com');

        await page.locator("input#userPassword").fill("Ilovemymom@143");

        await page.locator("//input[@name='login']").click();

        await page.waitForLoadState('networkidle');

        await use(page);

        await context.close();
    },

    createOrder: async ({ }, use) => {

        const apiContext = await request.newContext();

        const apiUtils = new APIUtils(apiContext, loginpayload);

        const response = await apiUtils.createOrder(orderpayload);

        await use(response);

        await apiContext.dispose();
    }

});