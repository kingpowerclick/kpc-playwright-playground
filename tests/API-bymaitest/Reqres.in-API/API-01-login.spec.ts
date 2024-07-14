import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyRespUserdata, verifyStatusCode } from "./function";

const baseURL = resource.baseURL;
// Regres.in
test('POST Login - Success' , async ({request}) => {
    const resp = await request.post ('https://reqres.in/api/login' , {
        data: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    });

    expect(resp.status()).toBe(200);
    const respBody = await resp.json();
    expect(respBody).toHaveProperty("token");
    expect(respBody.token).toBeTruthy()
  
})

test('POST Login - Fail' , async ({request}) => {
    const resp = await request.post (`${resource.baseURL}/login` , {
        data: {
            email: "peter@klaven"
        }
    });

    const respBody = await resp.json();
    verifyStatusCode(resp);
    expect(respBody.error).toEqual('Missing password');
    console.log(resp);
})

test('Register - Success' , async ({request}) => {
    const resp = await request.post(`${baseURL}/register` , {
        data: {
            email: "eve.holt@reqres.in",
            password: "pistol"
        }
    });

    const respBody = await resp.json()
    console.log(respBody)
    verifyStatusCode(resp)
    expect(respBody).toHaveProperty('id')
    expect(respBody.id).toBeTruthy()
    expect(respBody.token).toBeTruthy()

})