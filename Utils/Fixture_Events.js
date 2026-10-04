const base = require('@playwright/test');
const { expect,request } = require('@playwright/test');
const { userInfo } = require('os');
const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com';

const credentials = {
    email: 'shishira@gmail.com',
    password: 'Shishira@3'
};

exports.customTest_Events = base.test.extend({

    authenticatedPage: async ({ browser }, use) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(LOGIN_URL);
        await page.getByPlaceholder('you@email.com').fill(credentials.email);
        await page.getByLabel('password').fill(credentials.password);
        await page.getByRole('button').click();
        await expect(page.getByText('Featured Events')).toBeVisible();
        await use(page);
        await context.close();
    },

    createEvent: async ({ }, use) => {

        const apiContext = await request.newContext({ baseURL: API_BASE_URL });
        const loginRes = await apiContext.post('/api/auth/login', { data: credentials });
        console.log('LOGIN STATUS:', loginRes.status());
        console.log('LOGIN RESPONSE:', await loginRes.text());
        const loginResponseJson = await loginRes.json();
        const token = loginResponseJson.token;

        const eventPayload = {
            title: `Automation Test Event ${Date.now()}`,
            description: 'Created by an automated Playwright fixture for testing.',
            category: 'Conference',
            venue: 'Bangalore International Centre',
            city: 'Bangalore',
            eventDate: '2026-09-27T09:00:00.000Z',
            price: 1500,
            totalSeats: 500,
            imageUrl: 'https://example.com/images/automation-event.jpg',
        };
        const createRes = await apiContext.post('/api/events', {
            data: eventPayload,
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('CREATE EVENT STATUS:', createRes.status());
        const createResponse = await createRes.text();

        console.log('CREATE EVENT RESPONSE:', createResponse);
        const body = await createRes.json();
        const event = body.data; // event object is nested under "data"
        await use(event);
        //teardown
      await apiContext.delete(`/api/events/${event.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

        await apiContext.dispose();
    },

});

exports.expect=expect;