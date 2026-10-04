# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Assignment2.spec.js >> @Web refund eligible for single ticket booking
- Location: tests\Assignment2.spec.js:18:6

# Error details

```
Error: page.goto: net::ERR_NETWORK_CHANGED at https://eventhub.rahulshettyacademy.com/login
Call log:
  - navigating to "https://eventhub.rahulshettyacademy.com/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "Your connection was interrupted" [level=1] [ref=e7]
    - paragraph [ref=e8]: A network change was detected.
    - generic [ref=e9]: ERR_NETWORK_CHANGED
  - button "Reload" [ref=e12] [cursor=pointer]
```

# Test source

```ts
  1  | const{test,expect}=require('playwright/test');
  2  | const { TIMEOUT } = require('node:dns');
  3  | const Base_url='https://eventhub.rahulshettyacademy.com';
  4  | const username='shishira@gmail.com';
  5  | const password='Shishira@3'
  6  | 
  7  | async function loginAndGoToBooking(page) {
  8  | await page.goto(`${Base_url}/login`);
  9  |     await page.getByPlaceholder('you@email.com').fill(username);
  10 |     await page.getByLabel('password').fill(password);
  11 |     await page.getByRole('button').click();
  12 |     const events=page.locator('#nav-events');
  13 |     await events.isVisible();
  14 |     
  15 | }
  16 | //test.describe.configure({mode:'parallel'})
  17 | //test.describe.configure({mode:'serial'})
  18 | test.only(`@Web refund eligible for single ticket booking`,async({page})=>
  19 | {
  20 |     
> 21 |     await page.goto(`${Base_url}/login`);
     |                ^ Error: page.goto: net::ERR_NETWORK_CHANGED at https://eventhub.rahulshettyacademy.com/login
  22 |     await page.getByPlaceholder('you@email.com').fill(username);
  23 |     await page.getByLabel('password').fill(password);
  24 |     await page.getByRole('button').click();
  25 |     const events=page.locator('#nav-events');
  26 |     await events.isVisible();
  27 |     await events.click();
  28 |     await page.locator("//article[@data-testid='event-card']").first().locator("#book-now-btn").click();
  29 |     await page.getByLabel("Full Name").fill("Shishira Reddy")
  30 |     await page.getByLabel("Email").fill("shishira@gmail.com");
  31 |     await page.getByLabel("Phone Number").fill("9845236789");
  32 |     await page.getByText("Confirm Booking").click({timeout:10000});
  33 |     await page.getByText("My Bookings").first().click();
  34 |     await expect(page).toHaveURL(`bookings`);
  35 |     await page.getByText("View Details").first().click();
  36 |     await expect(page.getByText("Booking Information")).toBeVisible();
  37 |     const bookingRefId=await page.locator(".font-mono").last().textContent();
  38 |     console.log(bookingRefId);
  39 |     const EventTitle=await page.locator("h1").first().textContent();
  40 |     console.log(EventTitle);
  41 |     await expect(bookingRefId.charAt(0)).toBe(EventTitle.charAt(0));
  42 |     await page.locator("#check-refund-btn").click();
  43 |     await expect(page.locator("#refund-spinner")).toBeVisible();
  44 |     await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
  45 |     await expect(page.locator('#refund-result')).toContainText('Eligible for refund');
  46 |     await expect(page.locator("#refund-result")).toContainText('Single-ticket bookings qualify for a full refund');
  47 | });
  48 | 
  49 | test.only('refund not eligible for group ticket booking', async ({ page }) => {
  50 |   await loginAndGoToBooking(page);
  51 |   await page.locator("//article[@data-testid='event-card']").first().locator("#book-now-btn").click();
  52 |   await page.locator("//button[text()='+']").dblclick();
  53 |   await page.getByLabel("Full Name").fill("Shishira Reddy")
  54 |     await page.getByLabel("Email").fill("shishira@gmail.com");
  55 |     await page.getByLabel("Phone Number").fill("9845236789");
  56 |     await page.getByText("Confirm Booking").click({timeout:10000});
  57 |     await page.getByText("My Bookings").first().click();
  58 |     await expect(page).toHaveURL(`bookings`);
  59 |     await page.getByText("View Details").first().click();
  60 |     await expect(page.getByText("Booking Information")).toBeVisible();
  61 |     const bookingRefId=await page.locator(".font-mono").last().textContent();
  62 |     console.log(bookingRefId);
  63 |     const EventTitle=await page.locator("h1").first().textContent();
  64 |     console.log(EventTitle);
  65 |     await expect(bookingRefId.charAt(0)).toBe(EventTitle.charAt(0));
  66 |     await page.locator("#check-refund-btn").click();
  67 |     await expect(page.locator("#refund-spinner")).toBeVisible();
  68 |     await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
  69 |     await expect(page.locator('#refund-result')).toContainText('Not eligible for refund.');
  70 |     await expect(page.locator("#refund-result")).toContainText('Group bookings (3 tickets) are non-refundable.');
  71 |     await page.pause();
  72 | 
  73 | });
  74 | 
```