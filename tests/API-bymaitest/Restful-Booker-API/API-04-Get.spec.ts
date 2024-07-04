import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingID , verifyStatusCode } from "./function";


//Restful-booker
test('Get - Auth login' , async ({request}) => {
    const resp = await request.post(`${resource.baseURL}/auth` , {
        data : {
            username : "admin",
            password : "password123"
        }
    })
    const respBody = await resp.json()
    verifyStatusCode(resp);
    expect(respBody).toHaveProperty("token");
    expect(respBody.token).not.toBe("null");
    console.log(resp)


})