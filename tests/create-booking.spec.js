import { test, expect } from '@playwright/test';

test('NewBooking creation ', async ({ request }) => {
  const newBooking = {
    firstname: 'Kseniia',
    lastname: 'Musidze',
    totalprice: 300,           
    depositpaid: true,         
    bookingdates: {
      checkin: '2026-09-01',   
      checkout: '2026-09-10',
    },
    additionalneeds: 'Breakfast',
  };

  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: newBooking,
  });


  if (response.status() !== 200) {
    console.log('Error message:', await response.text());
  }

  expect(response.status()).toBe(200);

  const body = await response.json();
  
  expect(body).toHaveProperty('bookingid');
  expect(body.booking.firstname).toBe('Kseniia');
  expect(body.booking.totalprice).toBe(300);
});