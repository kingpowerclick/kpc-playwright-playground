import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { createBooking, createBookingTEST, getBookingDetailsbyID, 
verifyBookingDetails, verifyBookingIDbyDate , verifyStatusCode, verifyStatusText } from "./function";
import { request } from "http";
import { ok } from "assert";

let tokenID ;
let bookingID ;
const baseURL = resource.baseURL

//Restful-booker
test('Get - Auth login' , async ({request}) => {
    const resp = await request.post(`${baseURL}/auth` , {
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
        const resp = await request.post(`${baseURL}/booking` , {
        data: {
                firstname : "Supan",
                lastname : "Hatt",
                totalprice : 15000 ,
                depositpaid : true,
                bookingdates : {
                    checkin : "2024-01-12",
                    checkout : "2024-01-13"
                },
                additionalneeds : "Breakfast"
            }
        })
    
        const respBody =  await resp.json();  //JSON.parse(await resp.text()) ไว้ใช้แปลง resp text เป็น json 
        verifyStatusCode(resp);
        expect(respBody).toHaveProperty('bookingid');
        console.log(respBody)
        expect(respBody.booking.additionalneeds).toEqual('Breakfast');
        expect(respBody.booking.firstname).toEqual('Supan')
        
        bookingID = respBody.bookingid

        await test.step('Get - BookingDetails By ID' , async () => {
            const resp = await request.get(`${baseURL}/booking/${bookingID}` , {
                headers: {
                    "Accept" :"application/json", }
            })
            const respBody = await resp.json();
            console.log(respBody)
            verifyStatusCode(resp)
            verifyBookingDetails(respBody);
    
        })
    
    })


    //ทดสอบอัพเดทข้อมูล booking by ID
test('PATCH - Update Name' , async ({request}) => {
        
    const respCreatebooking = await createBooking(request)
    const respBodyCreatebooking = await respCreatebooking.json()
    console.log('resp from post data',respBodyCreatebooking)
    const bookingID = respBodyCreatebooking.bookingid

    const resp = await request.patch(`${baseURL}/booking/${bookingID}` , {
            headers: {
                "ContentType" : "application/json" ,
                "Accept" :"application/json",
                "Authorization" :"Basic YWRtaW46cGFzc3dvcmQxMjM=" },
            data:{
                "firstname" :"Pink" ,
                "lastname" : "Blue" },
    });
        const respBody = await resp.json();
        console.log('***')
        verifyStatusCode(resp)
        verifyStatusText(resp)
        // expect(respBody.firstname).toEqual("Pink")
        // expect(respBody.lastname).toEqual("Blue")
        // expect(respBody.totalprice).toEqual(9000)
        console.log(respBody)

    await test.step('Get - BookingDetails by ID' , async () => {
        const respVerifyGet = await getBookingDetailsbyID(bookingID,request)
        const respBodyGet = await respVerifyGet.json()
        console.log('---' ,respBodyGet)
        verifyStatusCode(respVerifyGet)
        verifyStatusText(respVerifyGet)
        expect(respBodyGet.firstname).toEqual("Pink")
        expect(respBodyGet.lastname).toEqual("Blue")
        expect(respBodyGet.totalprice).toEqual(9000)

    })

})  

    //ทดสอบใช้ params
test('Get - booking ID by Date' , async ({request}) => {

    const resp = await request.get(`${baseURL}/booking` , {
            params : {
                checkin : "2023-12-01" , 
                checkout : "2024-12-30"
                }
    })

    const respBody = await resp.json()
    console.log(respBody)
    verifyStatusCode(resp)
    //verifyStatusText(respBody)
    verifyBookingIDbyDate(respBody)
    //expect(respBody).toContain(bookingID) //ยังไม่ผ่าน



})



test('Get - booking ID by Name:Mark' , async ({request}) => {})
test('Get - All booking ID' , async ({request}) => {})