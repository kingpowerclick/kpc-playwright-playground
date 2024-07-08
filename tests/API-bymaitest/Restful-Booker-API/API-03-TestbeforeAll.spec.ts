import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingDetails, verifyStatusCode } from "./function";
import { request } from "http";

let bookingID ;  // ประกาศตัวแปร เก็บค่า bookingID  ไว้ใช้ validate ต่อ
//let bookingList = new Array();  //เป็นการประกาศตัวแปรประเภท array หรือจะเขียนเป็น let bookingID = [] ;

//เพิ่ม beforeAll เพื่อสร้่างข้อมูลขึ้นมาชุดนึง และเก็บตัวแปรเอาไปใช้ต่อ
test.beforeAll(async ({request}) => {
    const resp = await request.post(`${resource.baseURL}/booking` , {
        data: {
                "firstname" : "Fluke",
                "lastname" : "Wara",
                "totalprice" : 9000 ,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2024-01-01",
                    "checkout" : "2024-01-12"
                },
                "additionalneeds" : "Breakfast"
            }
    })

    const respBody = await resp.json();
    verifyStatusCode(resp);
    expect(respBody).toHaveProperty('bookingid');
    console.log(respBody)
    expect(respBody.booking).toHaveProperty('additionalneeds');
    expect(respBody.booking.firstname).toEqual('Fluke');
    
    bookingID = respBody.bookingid ; 
})

test.describe('PUT - Update booking' , () => {
    test('Verify post data success' , async ({request}) => {  //get เพื่อเช็คว่าเราสร้าง bookingID ที่ post ไป แสดงข้อมูลถูกต้อง
        const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
        const respBody = await resp.json()
        console.log(respBody)
        verifyStatusCode(resp)
        expect(respBody.firstname).toEqual('Fluke')
    })
    
    test('Edit booking by Put method' , async ({request}) => {
        const resp = await request.put(`${resource.baseURL}/booking/${bookingID}` , {
            headers : {
                "ContentType" : "application/json" ,
                "Accept" :"application/json",
                "Authorization" :"Basic YWRtaW46cGFzc3dvcmQxMjM=",
            },
            data : {
                "firstname" : "Mai",
                "lastname" : "Hatt",
                "totalprice" : 10000 ,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2024-01-01",
                    "checkout" : "2024-01-12"
                },
                "additionalneeds" : "Breakfast + Dinner"
            }
        })
        const respBody = await resp.json()
        console.log(respBody)
        verifyStatusCode(resp)
        expect(respBody.firstname).toEqual('Mai')
        expect(respBody.totalprice).toEqual(10000)

    })
})

test.describe('Delete - booking from post data' , () => {
    test('Verify post data success' , async ({request}) => {  //get เพื่อเช็คว่าเราสร้าง bookingID ที่ post ไป แสดงข้อมูลถูกต้อง
        const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
        const respBody = await resp.json()
        console.log(respBody)
        verifyStatusCode(resp)
        expect(respBody.firstname).toEqual('Fluke')
    })
    
    test('Delete - created booking' , async ({request}) => {
        const resp = await request.delete(`${resource.baseURL}/booking/${bookingID}` , {
            headers: {
                "ContentType" : "application/json" ,
                "Authorization" :"Basic YWRtaW46cGFzc3dvcmQxMjM=",
            }
        })
        const respBody = await resp.text()
        console.log (respBody)
        verifyStatusCode(resp)
        expect(respBody).toEqual('Created')


    })

})