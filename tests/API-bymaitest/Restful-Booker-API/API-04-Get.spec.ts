import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingDetails, verifyBookingID , verifyStatusCode } from "./function";

//let tokenID ;

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
    console.log(respBody);

    //tokenID = respBody.token ;
})

test('Get - BookingDetails' , async ({request}) => {
    let bookingID = resource.bookingID ;
    const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
    const respBody = await resp.json();
    verifyBookingDetails(respBody); // ยังรันไม่ผ่าน

})

//ทดสอบอัพเดทข้อมูล booking by ID
// test('PATCH - Update Name' , async ({request}) => {
//     const resp = await request.patch(`${resource.baseURL}/booking/4810` , {
//         data:{
//                 "firstname" :"Supan" ,
//                 "lastname" : "Hatt" }
        // headers: {
        //     "ContentType" : "application/json" ,
        //     "Accept" :"application/json",
        //      "Cookie" : `token=05d20c33a86ee87` },
//     });
//     const respBody = await resp.json();
//     verifyStatusCode(resp)
//     expect(respBody.firstname).toEqual("Supan")
//     expect(respBody.lastname).toEqual("Hatt")
//     expect(respBody.totalprice).toEqual(111)
//     console.log(respBody)
//})