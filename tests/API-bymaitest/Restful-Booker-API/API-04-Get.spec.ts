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

//ทดสอบอัพเดทข้อมูล booking by ID
test('PATCH - Update Name' , async ({request}) => {
    const resp = await request.patch(`${resource.baseURL}/booking/3204` , {
        headers: {
            ContentType : "application/json" ,
            Accept :"application/json"
        },
        data : { firstname :"Supan" ,
                lastname : "Hatt"
        }
    })
    const respBody = await resp.json()
    verifyStatusCode(resp)
    expect(respBody.firstname).toEqual("Supan")
    expect(respBody.lastname).toEqual("Hatt")
    expect(respBody).toHaveProperty("Bookingdates")

})