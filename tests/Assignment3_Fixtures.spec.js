const { expect } = require('@playwright/test');
const { customTest_events, customTest_Events } = require("../Utils/Fixture_Events.js");

customTest_Events('Fixtures Assgniment', async ({ authenticatedPage, createEvent }) => {

    await authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
    await authenticatedPage.pause();
   await expect( authenticatedPage.locator('h3', { hasText: 'Automation Test Event' })).toBeVisible();
});