import { expect, APIResponse, APIRequestContext } from "@playwright/test";
import { resource } from "./data";
import { request } from "http";

export const verifyStatusCode = (response: APIResponse) => {
    if (response.status() == 200) {
    expect (response.status()).toEqual(200)
    }
    else if (response.status() == 201) {
    expect(response.status()).toEqual(201)
    }
    else if (response.status() == 404) {
    expect(response.status()).toEqual(404)
    }
    else {(response.status() == 400)
    expect(response.status() == 400)}
}

export const verifyStatusText = (response: APIResponse) => {
    if(response.statusText() == 'OK'){
    expect(response.statusText()).toBe('OK')
    }
    else if(response.statusText() == 'Not Found') {
    expect(response.statusText()).toBe('Not Found')
    }

}


export const verifyBookingDetails = (resp : any) => {
    const dataBooking = resource.bookingDetail
    expect(resp.firstname).toEqual(dataBooking.firstname);
    expect(resp.lastname).toEqual(dataBooking.lastname);
    expect(resp.totalprice).toEqual(dataBooking.totalprice);
    expect(resp.depositpaid).toEqual(dataBooking.depositpaid);
    expect(resp.bookingdates.checkin).toEqual(dataBooking.bookingdates.checkin);
    expect(resp.bookingdates.checkout).toEqual(dataBooking.bookingdates.checkout);
    //expect(resp.additionalneeds).toEqual(dataBooking.additionalneeds);

    // let bookingDetailsList = new Array();
    // const bookingData = resource.bookingDetail;
    // bookingDetailsList.push(bookingData);
    
    // // for(let index=0;index < bookingData.length; index++){
    // //     expect(resp.booking[index].firstname).toEqual(bookingData[index].firstname)

    // // }
}

export  const createBooking = (request : APIRequestContext) => {
    console.log('In to Function')
    const resp = request.post(`${resource.baseURL}/booking` , {
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
    
    return resp
    // const respBody = resp.json();
    // verifyStatusCode(resp);
    // expect(respBody).toHaveProperty('bookingid');
    // console.log(respBody)
    // expect(respBody.booking).toHaveProperty('additionalneeds');
    // expect(respBody.booking.firstname).toEqual('Fluke');
    
    // let bookingID = respBody.bookingid ; 
    // return bookingID
}

export const getBookingDetailsbyID = (bookingID:any, request : APIRequestContext) => {
    console.log('In to Function')
    const resp = request.get(`${resource.baseURL}/booking/${bookingID}`)
    return resp
}


export const verifyBookingIDbyDate = ( resp : any) => {
    const bookingID = resource.bookingID
    console.log(bookingID.length)
    for(let index = 0 ; index < bookingID.length; index++){
        expect(resp[index].bookingid).toEqual(bookingID[index].bookingid)
    }

}


//ทดลองเอาพวก respBody กับ expect ต่างๆไว้ใน func
export const createBookingTEST = (request : APIRequestContext , bookingID : number) => { 
    async() => {
    console.log('In to Function')
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
    const respBody = await resp.json()
    console.log('Test' ,respBody)
    expect(respBody.fistname).toBe('Fluke')
    const bookingID = respBody.bookingid

    return bookingID
    
    }
}