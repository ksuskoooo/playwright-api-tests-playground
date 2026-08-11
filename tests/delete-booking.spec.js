import {test, expect} from '@playwright/test'

test ('Booking is deleted', async ({request}) => {
   
    const authResponse = await request.post ('https://restful-booker.herokuapp.com/auth', {
        data: { username:'admin', password :'password123'}, 
    });
    const authResponseBody = await authResponse.json(); 
    const token = authResponseBody.token;


    const newBookingResponse = await request.post ('https://restful-booker.herokuapp.com/booking',{
        data: {
            firstname: 'ForDelete',
            lastname: 'User',
            totalprice: 100,
            depositpaid: true,
            bookingdates: { checkin: '2026-09-01', checkout: '2026-09-02' },
            additionalneeds: 'None',
        },
    });
    const newBookingBody = await newBookingResponse.json();
    const newBookindId = newBookingBody.bookinid;

    const deleteBookingResponse = await request.delete (`https://restful-booker.herokuapp.com/booking/${newBookindId}`,
        {
            headers: {
            Cookie:`token=${token}`
        }
        });
        const deleteBookingResponseStatus = deleteBookingResponse.status();
        // expect(deleteBookingResponseStatus).toBe(201);

    const deletedBookingIdResponse = await request.get (`https://restful-booker.herokuapp.com/booking/${newBookindId}`,  
    )
    
    expect(deletedBookingIdResponse.status()).toBe(404)
})