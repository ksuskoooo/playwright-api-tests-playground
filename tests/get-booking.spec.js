import { test, expect } from '@playwright/test';

test('Get the bookings', async ({ request }) => {

    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200);

    const body = await response.json();
    
    expect(Array.isArray(body)).toBeTruthy();
    console.log('Elements', body.length);
});