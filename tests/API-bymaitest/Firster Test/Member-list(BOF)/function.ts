import { expect, APIResponse, APIRequestContext } from "@playwright/test";
import { resource } from "./data";

const baseURL = resource.baseURL;


export const loginBOF = (username: string, password: string , request: APIRequestContext) => {
    const resp = request.post(`${baseURL}` , {
        data: {
            query:  `
            mutation Login {
                loginBackOffice(input: { username: "${username}", password: "${password}" }) {
                    tokenType
                    accessToken
                    refreshToken
                    expiresIn
                }
            }`
            }
    })

    return resp
}


export const verifyStatusCodeSuccess = (response: APIResponse) => {
    if (response.status() == 200) {
    expect (response.status()).toEqual(200)
    }
    else if (response.status() == 201) {
    expect(response.status()).toEqual(201)
    }
}

export const verifyStatusCodeFail = (response: APIResponse) => {
    if (response.status() == 404) {
    expect(response.status()).toEqual(404)
    }
    else {(response.status() == 400)
    expect(response.status()).toEqual(400)
    }
}