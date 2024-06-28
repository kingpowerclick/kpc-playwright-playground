import { expect, test } from "@playwright/test";

// Regres.in
test('POST Login - Success' , async ({request}) => {
    const resp = await request.post ('https://reqres.in/api/login' , {
        data: {
            "email": "eve.holt@reqres.in",
            "password": "cityslicka"
        }
    });

    expect(resp.status()).toBe(200);
    const respBody = await resp.json();
    expect (respBody).toHaveProperty("token");
  
})

test('POST Login - Fail' , async ({request}) => {

 



})