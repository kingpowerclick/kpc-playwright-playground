import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { loginFront, verifyMyProfile, verifyStatusCode, verifyStatusText } from "./function";
import { log } from "console";

const baseURL = resource.baseURL;
const myProfile = resource.myProfile;
const login = resource.login;
let accessToken;

    //ลองใช้ before กับ ​function login มาใส่ใน data = PASS
// test.beforeAll('Login with my account' , async ({request}) => {
//     const resp = await request.post(`${baseURL}` , {
//         data: {
//             query: loginFront(login.username, login.usernameTypeEmail, login.password, login.phoneCode)
//         }
//     })
//     const respBody = await resp.json()
//     verifyStatusCode(resp);
//     verifyStatusText(resp)
//     console.log(respBody);
//     expect(respBody.data.login).toHaveProperty("accessToken");
//     expect(respBody.accessToken).not.toBeNull();
//     expect(respBody.data.login).toBeTruthy();

//     accessToken = respBody.data?.login?.accessToken ;
//     console.log('Token' ,accessToken)

// })

    //ลองใช้ before กับ ​function login มาใส่ทั้งหมด
test.beforeAll('Login with my account' , async ({request}) => {
    
    const resp = await loginFront(login.username, login.usernameTypeEmail, login.password, login.phoneCode , request)

    const respBody = await resp.gql()
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