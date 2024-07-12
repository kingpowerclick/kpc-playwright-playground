import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { getBookingDetailsbyID, verifyBookingDetails, verifyStatusCode } from "./function";
import { request } from "http";

let bookingID ;  // ประกาศตัวแปร เก็บค่า bookingID  ไว้ใช้ validate ต่อ
//let bookingList = new Array();  //เป็นการประกาศตัวแปรประเภท array หรือจะเขียนเป็น let bookingID = [] ;

//เพิ่ม beforeAll เพื่อสร้่างข้อมูลขึ้นมาชุดนึง และเก็บตัวแปรเอาไปใช้ต่อในเทสเคสอื่น
test.beforeEach(async ({request}) => {
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
    expect(respBody).toHaveProperty('bookingid'); //POST,PUT,PATCH,Delete จริงๆไม่ต้อง check respBody เช็คแค่สถานะ success
    console.log(respBody)
    expect(respBody.booking).toHaveProperty('additionalneeds'); //แต่ต้อง get เพื่อมาเช็ค respBody ทุกครั้งว่า success & correct
    expect(respBody.booking.firstname).toEqual('Fluke'); //
    
    bookingID = respBody.bookingid ; 
})

test.describe('PUT - Update booking' , () => {
    test('Edit posted booking' , async ({request}) => {  //get เพื่อเช็คว่าเราสร้าง bookingID ที่ post ไป แสดงข้อมูลถูกต้อง
        await test.step('Check userID is present' , async () => {
            const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
            const respBody = await resp.json()
            console.log(respBody)
            verifyStatusCode(resp)
            expect(respBody.firstname).toEqual('Fluke')
        })
    
        await test.step('Put data' , async () => {  //ทำการแก้ไขข้อมูล bookingID นั้น
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

            //verifyStatusCode(resp)
            expect(resp.ok()).toBeTruthy()
            const respBody = await resp.json()  //POST,PUT,PATCH,Delete จริงๆไม่ต้อง check respBody เช็คแค่สถานะ success
            expect(respBody.firstname).toEqual('Mai') //หลังจาก method พวกนี้ ต้อง get เพื่อมาเช็ค respBody ทุกครั้ง
            expect(respBody.totalprice).toEqual(10000)

        })

        await test.step ('Check put success' , async () => {
            const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
            const respBody = await resp.json()
            console.log(respBody)
            verifyStatusCode(resp)
            expect(respBody.firstname).toEqual('Mai')
            expect(respBody.totalprice).toEqual(10000)
            expect(respBody.additionalneeds).toEqual('Breakfast + Dinner')
        })
    })
})

test.describe('Delete - booking from post data' , () => {
    test('Delete post data' , async ({request}) => {  //get เพื่อเช็คว่าเราสร้าง bookingID ที่ post ไป แสดงข้อมูลถูกต้อง
        const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
        const respBody = await resp.json()
        console.log(respBody)
        verifyStatusCode(resp)
        expect(respBody.firstname).toEqual('Fluke')
    
        await test.step('Delete - created booking' , async () => {
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
            await getBookingDetailsbyID(bookingID ,request)  //ดึง function Get มาใช้
            console.log ('----')
        })
    
        // await test.step ('Check delete success' , async () => {
        //     const resp = await getBookingDetailsbyID(bookingID , request)
        //     verifyStatusCode(resp)
        //     console.log('----')
        // })

    })
})