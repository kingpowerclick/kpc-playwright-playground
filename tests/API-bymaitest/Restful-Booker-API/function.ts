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

export const verifyBookingID = (bookingID: number) => {
    
}