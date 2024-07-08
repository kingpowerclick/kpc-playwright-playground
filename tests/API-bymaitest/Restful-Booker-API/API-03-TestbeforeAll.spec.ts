import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyBookingDetails, verifyStatusCode } from "./function";
import { request } from "http";

let bookingID ;
let bookingList = new Array();  //เป็นการประกาศตัวแปรประเภท array หรือจะเขียนเป็น let bookingID = [] ;

test('POST - create booking' , async ({request}) => {
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
    expect(respBody.booking.firstname).toEqual('Fluke')
    bookingList.push(respBody);  // วิธีเพิ่มข้อมูลเข้าไปใน array จะเป็นการเพิ่มข้อมูลต่อท้ายเข้าไปใน array เป็นการเพิ่ม respBody เข้าไปในตัวแปร bookingList


    for(let index=0;index<bookingList.length;index++) {
        const resp = await request.get(`${resource.baseURL}/booking/${bookingList[index].bookingid}`)
        const respBody = await resp.json()
        expect(respBody.firstname).toEqual('Fluke')
        console.log(respBody)

    }

})



// test('Get - BookingDetails' , async ({request}) => {
//     let bookingID = resource.bookingID ;
//     const resp = await request.get(`${resource.baseURL}/booking/${bookingID}`)
//     const respBody = await resp.json();
//     verifyBookingDetails(respBody); // ยังรันไม่ผ่าน

// })