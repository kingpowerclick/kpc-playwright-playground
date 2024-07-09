import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingDetails, verifyBookingID , verifyStatusCode } from "./function";
import { request } from "http";

let tokenID ;
let userID;

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
                "firstname" : "Supan",
                "lastname" : "Hatt",
                "totalprice" : 15000 ,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2024-01-12",
                    "checkout" : "2024-01-13"
                },
                "additionalneeds" : "Breakfast"
            }
    })
    
    const respBody = await resp.json();
    verifyStatusCode(resp);
    expect(respBody).toHaveProperty('bookingid');
    console.log(respBody)
    expect(respBody.booking).toHaveProperty('additionalneeds');
    expect(respBody.booking.firstname).toEqual('Supan')

    userID = await respBody.bookingid;
})


test('Get - BookingDetails' , async ({request}) => {
    const resp = await request.get(`${resource.baseURL}/booking/${userID}` , {
        headers : {
            "Accept" :"application/json",
        }
    })
    const respBody = await resp.json();
    console.log(respBody)
    //expect(respBody.firstname).toEqual('Supan')
    verifyBookingDetails(respBody); // ยังรันไม่ผ่าน

})

//ทดสอบอัพเดทข้อมูล booking by ID
test('PATCH - Update Name' , async ({request}) => {
    const resp = await request.patch(`${resource.baseURL}/booking/${userID}` , {
        headers: {
            "ContentType" : "application/json" ,
            "Accept" :"application/json",
            "Authorization" :"Basic YWRtaW46cGFzc3dvcmQxMjM=" },
        data:{
                "firstname" :"Pink" ,
                "lastname" : "Blue" },
    });
    const respBody = await resp.json();
    verifyStatusCode(resp)
    expect(respBody.firstname).toEqual("Pink")
    expect(respBody.lastname).toEqual("Blue")
    expect(respBody.totalprice).toEqual(15000)
    console.log(respBody)
})

//ทดสอบใช้ params
test('Get - booking ID by Date' , async ({request}) => {
    const resp = await request.get(`${resource.baseURL}/booking` , {
        params : {
            checkin : "2021-03-19" , 
            checkout : "2024-01-26"
        }
    })

    const respBody = await resp.json()
    console.log(respBody)
    expect(respBody).toContain(userID) //ยังไม่ผ่าน


})