import {test,expect} from '@playwright/test'

test ('get booking details by test id', async ({request})=>
    {
     const listResponse = await request.get('https://restful-booker.herokuapp.com/booking'); 
     const bookings = await listResponse.json();  


    const bookingiD = bookings[5].bookingid
    const bookingInfoResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingiD}`)

    expect(bookingInfoResponse.status()).toBe(200);
    const bookingInfo = await bookingInfoResponse.json();
    console.log (await bookingInfoResponse.json());

   expect(bookingInfo).toHaveProperty('firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates')

    })