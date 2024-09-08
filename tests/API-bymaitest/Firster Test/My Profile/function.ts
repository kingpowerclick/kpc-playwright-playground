import { expect, APIResponse, APIRequest, APIRequestContext } from "@playwright/test";
import { resource } from "./data";
import { memoryUsage } from "process";

const baseURL = resource.baseURL;
const respMessage = resource.responseMessage;

    //เขียน function login ที่มีแค่ data ไม่มี request
export const loginFront = ( username: string, usernameType: string, password: string, phoneNumber: string) => {
    const gql =  `
    mutation Login {
        login(
            input: {
                username: "${username}"
                usernameType: ${usernameType}
                password: "${password}"
                phoneCode: "${phoneNumber}"
            }
        ) {
            tokenType
            accessToken
            refreshToken
            expiresIn
        }
    }` 
    return gql

}

//ทดลองเขียน function แบบมี request
export const loginFrontF1 = (username: string, usernameType: string, password: string, phoneNumber: string, request: APIRequestContext) => {
    console.log("Into Function")
    const resp = request.post(`${baseURL}` , {
        data: {
            query :  `
            mutation Login {
                login(
                    input: {
                        username: "${username}"
                        usernameType: ${usernameType}
                        password: "${password}"
                        phoneCode: "${phoneNumber}"
                    }
                ) {
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

export const getMyProfile = (accessToken: string, request: APIRequestContext) => {
    console.log("Function Get")
    const response = request.post(`${baseURL}` , {
        headers: {
            Authorization : `Bearer ${accessToken}`
        },
        data: {
            query: `
            query GetMyProfile {
                getMyProfile {
                    gender
                    phoneCode
                    mobileNumber
                    isMobileNumberActive
                    email
                    havePassword
                    customerId
                    isFirsterConsentAccepted
                    isFirsterMemberConsentAccepted
                    isMarketingConsentAccepted
                    member {
                        id
                        level
                        expireDate
                        point
                        firstName
                        lastName
                        birthdate
                        memberLevel {
                            code
                            name
                            expiryDate
                        }
                    }
                }
            }`
        }
    })

    return response

}


export const verifyStatusCode200 = (response: APIResponse) => {
    if (response.status() == 200) {
    expect (response.status()).toEqual(200)
    }
        // else if (response.status() == 201) {
        // expect(response.status()).toEqual(201)
        // }
}
 
export const verifyStatusCode400 = (response: APIResponse) => {
    expect(response.status() == 400)
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
    email: any, 
    customerId: string,
    isFirsterConsentAccepted: boolean,
    member: any,
    ) => {
    expect(resp.data.getMyProfile.mobileNumber).toEqual(`${mobileNumber}`)
    expect(resp.data.getMyProfile.email).toEqual(`${email}`)
    expect(resp.data.getMyProfile.customerId).toEqual(`${customerId}`)
    expect(resp.data.getMyProfile.isFirsterConsentAccepted).toEqual(isFirsterConsentAccepted)
    expect(resp.data.getMyProfile.member).toEqual(member)
    
}

export const verifyWrongPassword = (resp: any, code: string, message: string) => {
    expect(resp.errors[0].code).toEqual(code)
    expect(resp.errors[0].message).toEqual(message)
    expect(resp.errors[0].fields).toEqual([])
    expect(resp.errors[0].fields).toHaveLength(0)

}

export const verifyWrongFormat = (resp: any, code: string, message: string, field:any, error: string) => {
    expect(resp.errors[0].code).toEqual(code)
    expect(resp.errors[0].message).toEqual(message)
    expect(resp.errors[0].fields[0].field).toEqual(field)
    expect(resp.errors[0].fields[0].error).toEqual(error)

}

export const verifyNoInputData = (resp: any) => {
    expect(resp.errors[0].code).toEqual(respMessage.codeInvalidInput)
    expect(resp.errors[0].message).toEqual(respMessage.msgIncorrect)
    for (let index = 0; index < 4; index++) {
        expect(resp.errors[0].fields[index].field).toEqual(respMessage.fieldUsername)
    } 
    expect(resp.errors[0].fields[0].error).toEqual(respMessage.errorRequireUsername)
    expect(resp.errors[0].fields[1].error).toEqual(respMessage.errorUsernameEmpty)
    expect(resp.errors[0].fields[2].error).toEqual(respMessage.errorUsernamewithSpace)
    expect(resp.errors[0].fields[3].error).toEqual(respMessage.errorIncorrectFormat)
}


        //เช็คแบบเทียบค่า ไม่ได้ใช้ for 
// export const verifyNoUnputData1 = (resp: any, code: string, message: string, fields:[], field: string,field1: string,
//     field2: string,field3: string, error: string, error1: string, error2: string, error3: string) => {
    
//     // expect(resp.errors[0].code).toEqual(`${code}`)
//     // expect(resp.errors[0].message).toEqual(`${message}`)
//     // expect(resp.errors[0].fields[0].field).toEqual(`${field}`)
//     // expect(resp.errors[0].fields[0].error).toEqual(`${error}`)
//     // expect(resp.errors[0].fields[1].field).toEqual(`${field1}`)
//     // expect(resp.errors[0].fields[1].error).toEqual(`${error1}`)
//     // expect(resp.errors[0].fields[2].field).toEqual(`${field2}`)
//     // expect(resp.errors[0].fields[2].error).toEqual(`${error2}`)
//     // expect(resp.errors[0].fields[3].field).toEqual(`${field3}`)
//     // expect(resp.errors[0].fields[3].error).toEqual(`${error3}`)

// }