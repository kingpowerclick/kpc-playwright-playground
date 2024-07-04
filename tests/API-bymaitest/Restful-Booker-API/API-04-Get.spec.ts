import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingID , verifyStatusCode } from "./function";


//Restful-booker
test('Get - Auth login' , async ({request}) => {
    const resp = await request.post(`${resource.baseURL}/auth` , {
        data : resource.loginAccount  //ใส่เป็นข้อมูล { user,pass } ก็ได้หรือว่าประกาศใน data แล้วดึงมาใช้แบบนี้ก็ได้
    })
    const respBody = await resp.json()
    verifyStatusCode(resp);
    expect(respBody).toHaveProperty("token");
    expect(respBody.token).not.toBeNull();
    console.log(resp)
    console.log(respBody)
})