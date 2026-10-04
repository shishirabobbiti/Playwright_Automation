const{test,expect}=require('playwright/test');
const { TIMEOUT } = require('node:dns');
const Base_url='https://eventhub.rahulshettyacademy.com';
const username='shishira@gmail.com';
const password='Shishira@3'

async function loginAndGoToBooking(page) {
await page.goto(`${Base_url}/login`);
    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button').click();
    const events=page.locator('#nav-events');
    await events.isVisible();
    
}
//test.describe.configure({mode:'parallel'})
//test.describe.configure({mode:'serial'})
test.only(`@Web refund eligible for single ticket booking`,async({page})=>
{
    
    await page.goto(`${Base_url}/login`);
    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button').click();
    const events=page.locator('#nav-events');
    await events.isVisible();
    await events.click();
    await page.locator("//article[@data-testid='event-card']").first().locator("#book-now-btn").click();
    await page.getByLabel("Full Name").fill("Shishira Reddy")
    await page.getByLabel("Email").fill("shishira@gmail.com");
    await page.getByLabel("Phone Number").fill("9845236789");
    await page.getByText("Confirm Booking").click({timeout:10000});
    await page.getByText("My Bookings").first().click();
    await expect(page).toHaveURL(`bookings`);
    await page.getByText("View Details").first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRefId=await page.locator(".font-mono").last().textContent();
    console.log(bookingRefId);
    const EventTitle=await page.locator("h1").first().textContent();
    console.log(EventTitle);
    await expect(bookingRefId.charAt(0)).toBe(EventTitle.charAt(0));
    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
    await expect(page.locator('#refund-result')).toContainText('Eligible for refund');
    await expect(page.locator("#refund-result")).toContainText('Single-ticket bookings qualify for a full refund');
});

test.only('refund not eligible for group ticket booking', async ({ page }) => {
  await loginAndGoToBooking(page);
  await page.locator("//article[@data-testid='event-card']").first().locator("#book-now-btn").click();
  await page.locator("//button[text()='+']").dblclick();
  await page.getByLabel("Full Name").fill("Shishira Reddy")
    await page.getByLabel("Email").fill("shishira@gmail.com");
    await page.getByLabel("Phone Number").fill("9845236789");
    await page.getByText("Confirm Booking").click({timeout:10000});
    await page.getByText("My Bookings").first().click();
    await expect(page).toHaveURL(`bookings`);
    await page.getByText("View Details").first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRefId=await page.locator(".font-mono").last().textContent();
    console.log(bookingRefId);
    const EventTitle=await page.locator("h1").first().textContent();
    console.log(EventTitle);
    await expect(bookingRefId.charAt(0)).toBe(EventTitle.charAt(0));
    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
    await expect(page.locator('#refund-result')).toContainText('Not eligible for refund.');
    await expect(page.locator("#refund-result")).toContainText('Group bookings (3 tickets) are non-refundable.');
    await page.pause();

});
