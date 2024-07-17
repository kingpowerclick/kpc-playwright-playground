import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyMyProfile, verifyStatusCode, verifyStatusText } from "./function";

const baseURL = resource.baseURL;
const myProfile = resource.myProfile;
let accessToken;


test.beforeAll('Login with my account' , async ({request}) => {
    const resp = await request.post(`${baseURL}` , {
        data: {
            query: `
            mutation Login {
                login(
                    input: {
                        username: "mai@test.com"
                        usernameType: EMAIL
                        password: "F1mai123"
                        phoneCode: "0652236926"
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
    const respBody = await resp.json()
    verifyStatusCode(resp);
    verifyStatusText(resp)
    console.log(respBody);
    expect(respBody.data.login).toHaveProperty("accessToken");
    expect(respBody.accessToken).not.toBeNull();
    expect(respBody.data.login).toBeTruthy();

    accessToken = respBody.data?.login?.accessToken ;
    console.log('Token' ,accessToken)

})


test('Get My Profile' , async ({request}) => {
    const response = await request.post(`${baseURL}` , {
        headers: {
            Authorization : `Bearer ${accessToken}`
        },
        data: {
            query: `
            query GetMyProfile2 {
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
            }
            `
        }
    })
    
    const respBody = await response.json();
    console.log(respBody)
    verifyStatusCode(response)
    verifyStatusText(response)
    verifyMyProfile(
        respBody, 
        myProfile.mobileNumber,
        myProfile.email,
        myProfile.customerId,
        myProfile.member
    )
    console.log(myProfile.isFirsterConsentAccepted)




})