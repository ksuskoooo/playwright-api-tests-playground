import {test, expect} from '@playwright/test';

test('Auth is succsessful', async ({request}) => {

    const loginData = {
        username: 'admin',
        password: 'password123'
    }

    const response = await request.post('https://restful-booker.herokuapp.com/auth',{
        data: loginData, 
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');  
}
 ), 

 test ('wrong password auth', async ({request}) => {
    const invalidLoginData = {
        username: 'admin',
        password: 'admin'
    }
    const response = await request.post('https://restful-booker.herokuapp.com/auth',{
        data: invalidLoginData
    });
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).not.toHaveProperty('token');

    console.log('Error:', body);

 })