import { expect, APIResponse } from "@playwright/test";
import { resource } from "./data";
import { memoryUsage } from "process";



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

export const verifyStatusText = (response:any) => {
    if(response.statusText() == 'OK'){
    expect(response.statusText()).toBe('OK')
    }
    else if(response.statusText() == 'Not Found') {
    expect(response.statusText()).toBe('Not Found')
    }

}

export const verifyMyProfile = ( 
    resp: any,
    mobileNumber: string, 
    email: string, 
    customerId: string,
    member: any,
 ) => {
    expect(resp.data.getMyProfile.mobileNumber).toEqual(mobileNumber)
    expect(resp.data.getMyProfile.email).toEqual(email)
    expect(resp.data.getMyProfile.customerId).toEqual(customerId)
    expect(resp.data.getMyProfile.isFirsterConsentAccepted).toEqual(true)
    expect(resp.data.getMyProfile.member).toEqual(member)
    
}