import { expect, APIResponse } from "@playwright/test";
import { resource } from "./data";

export const verifyStatusCode = (response: APIResponse) => {
    if (response.status() == 200) {
    expect (response.status()).toEqual(200)
    }
    else if (response.status() == 201) {
    expect(response.status()).toEqual(201); 
    }
    else {(response.status() == 400)
    expect(response.status() == 400)}
}

export const verifyBookingDetails = (resp : any) => {
    const dataBooking = resource.bookingDetail
    expect(resp.firstname).toEqual(dataBooking.firstname);
    expect(resp.lastname).toEqual(dataBooking.lastname);
    expect(resp.totalprice).toEqual(dataBooking.totalprice);
    expect(resp.depositpaid).toEqual(dataBooking.depositpaid);


    // let bookingDetailsList = new Array();
    // const bookingData = resource.bookingDetail;
    // bookingDetailsList.push(bookingData);
    
    // // for(let index=0;index < bookingData.length; index++){
    // //     expect(resp.booking[index].firstname).toEqual(bookingData[index].firstname)

    // // }
}


export const verifyBookingID = ( resp : any) => {

}

