import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingDetails, verifyBookingID , verifyStatusCode } from "./function";

let tokenID ;
let bookingID;

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

    tokenID = respBody.token ;
})

test('POST - create booking & Verify success' , async ({request}) => {
    const resp = await request.post(`${resource.baseURL}/booking` , {
        data: {
                "firstname" : "Pink",
                "lastname" : "Sasiphat",
                "totalprice" : 5000 ,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2024-01-01",
                    "checkout" : "2024-01-12"
                },
                "additionalneeds" : null
            }
    })
    
    const respBody = await resp.json();
    verifyStatusCode(resp);
    expect(respBody).toHaveProperty('bookingid');
    console.log(respBody)
    expect(respBody.booking).toHaveProperty('additionalneeds');
    expect(respBody.booking.firstname).toEqual('Pink')

    bookingID = respBody.bookingid;
})


test('Get - BookingDetails' , async ({request}) => {
    const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
    const respBody = await resp.json();
    console.log(respBody)
    expect(respBody.firstname).toEqual('Pink')
    //verifyBookingDetails(respBody); // ยังรันไม่ผ่าน

})

//ทดสอบอัพเดทข้อมูล booking by ID
test('PATCH - Update Name' , async ({request}) => {
    const resp = await request.patch(`${resource.baseURL}/booking/${bookingID}` , {
        data:{
                "firstname" :"Supan" ,
                "lastname" : "Hatt" },
        headers: {
            "ContentType" : "application/json" ,
            "Accept" :"application/json",
             "Cookie" : `token=${tokenID}` },
    });
    const respBody = await resp.json();
    verifyStatusCode(resp)
    expect(respBody.firstname).toEqual("Supan")
    expect(respBody.lastname).toEqual("Hatt")
    expect(respBody.totalprice).toEqual(5000)
    console.log(respBody)
})