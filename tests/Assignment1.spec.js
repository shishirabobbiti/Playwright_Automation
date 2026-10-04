const{test,expect}=require('playwright/test');
const { TIMEOUT } = require('node:dns');

test.only('Event Creation',async({page})=>
{
    const Base_url='https://eventhub.rahulshettyacademy.com';
    await page.goto(`${Base_url}/login`);
    await page.getByPlaceholder('you@email.com').fill('shishira@gmail.com');
    await page.getByLabel('password').fill('Shishira@3');
    await page.getByRole('button').click();
    const events=page.locator('#nav-events');
    await events.isVisible();
    await events.click();
    await page.locator("//button[text()='Add New Event']").click();
    await page.getByLabel('Title').fill('Musical Night');
    await page.getByPlaceholder('Describe the event…').fill('A musical night is a lively evening event filled with live singing, instrumental performances, and a joyful crowd.');
    await page.getByLabel('city').fill('Hyderabad');
    await page.getByLabel('venue').fill('Hitech city');
   await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');
    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');
    await page.getByLabel('Image URL (optional)').fill('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    await page.getByText('+ Add Event').click();
    await expect (page.getByText('Event created!')).toBeVisible();
    await events.click();
    await page .locator("//article[@data-testid='event-card']").first().waitFor();
    const seatsBeforeBooking=  parseInt(await page.locator("//article[@data-testid='event-card']").filter({hasText:'Musical Night'}).getByText('seat').first().innerText());
    console.log(`seat Before Booking: ${seatsBeforeBooking}`);
    await page.locator("//article[@data-testid='event-card']").filter({hasText:'Musical Night'}).getByText('Book Now').click();
    const ticketcount=await page.locator('#ticket-count');
    await expect (ticketcount).toHaveText('1');
    await page.getByLabel('Full Name').fill('Ranjeet');
    await page.getByLabel('Email').fill('ranjeet19@gmail.com');
    await page.getByLabel('Phone Number').fill('8912346781');
    await page.getByText('Confirm Booking').click();
    const bookingref= await page.locator('.booking-ref').first();
    await expect(bookingref).toBeVisible();
    const bookingref1=(await bookingref.innerText()).trim();
    console.log(bookingref1); 
    await page.getByText('View My Bookings').click();
    await expect(page).toHaveURL(`bookings`);
    const Bookingcards=page.locator('#booking-card')
    await page.locator('.booking-ref').first().isVisible();
    const matchingcard= page.locator('.booking-ref').filter({hasText:bookingref1});
    expect(await matchingcard).toBeVisible();
    console.log(await matchingcard.textContent());
   await expect(Bookingcards.filter({ has: page.locator('.booking-ref', { hasText: bookingref1 }) })).toHaveText(/Musical Night/);
   await page.goto(`${Base_url}/events`);
   const eventhub=page.locator('#event-card');
   await expect(eventhub.first()).toBeVisible();
   const updatedcard= eventhub.filter({hasText:'Musical Night'}).first();
   await expect(updatedcard).toBeVisible();
   const seatsafterBooking=  parseInt(await updatedcard.getByText('seat').first().innerText());
   console.log(`seat after Booking: ${seatsafterBooking}`);
   expect(seatsBeforeBooking===seatsafterBooking-1)
});