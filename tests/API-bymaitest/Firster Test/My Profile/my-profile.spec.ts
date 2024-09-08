import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { getMyProfile, loginFrontF1, verifyMyProfile, verifyNoInputData, verifyStatusCode200, verifyStatusText, verifyWrongFormat, verifyWrongPassword } from "./function";


const baseURL = resource.baseURL;
const myProfile = resource.myProfile;
const login = resource.login;
const respMessage = resource.responseMessage;
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

    //ลองใช้ before กับ เอา​function login มาใช้ทั้งหมด
test('Login Success : with my account' , async ({request}) => {
    
    const resp = await loginFrontF1(login.usernameEmail, login.usernameTypeEmail, login.password, login.phoneCode ,request)

    const respBody = await resp.json()
    verifyStatusCode200(resp);
    verifyStatusText(resp)
    console.log(respBody);
    expect(respBody.data.login).toHaveProperty("accessToken");
    expect(respBody.accessToken).not.toBeNull();
    expect(respBody.data.login).toBeTruthy();

    console.log('Token', accessToken)
    accessToken = respBody.data?.login?.accessToken ;

    await test.step('Get My Profile : Login Success ' , async () => {
        const response = await getMyProfile(accessToken, request)
        
        const respBody = await response.json();
        console.log(respBody)
        verifyStatusCode200(response)
        verifyStatusText(response)
        verifyMyProfile(
            respBody,
            myProfile.mobileNumber,
            myProfile.email,
            myProfile.customerId,
            myProfile.isFirsterConsentAccepted,
            myProfile.member
        )
        console.log(myProfile.isFirsterConsentAccepted)

    })
})

test('Login Fail : Wrong password' , async({request}) => {
    const resp = await loginFrontF1(login.usernameEmail, login.usernameTypeEmail,login.invalidPass, login.phoneCode, request)

    const respBody = await resp.json()
    console.log(respBody)
    verifyStatusCode200(resp)
    verifyStatusText(resp)
    console.log(respBody.errors[0].fields)
    verifyWrongPassword(
        respBody, 
        respMessage.codeInvalidInput,
        respMessage.msgIncorrect, 
    )
})

test('Login Fail : Wrong Format Pass' , async({request}) => {
    const resp = await loginFrontF1(login.usernameEmail, login.usernameTypeEmail,login.wrongFormatPass, login.phoneCode, request)

    const respBody = await resp.json()
    console.log(respBody)
    verifyStatusCode200(resp)
    verifyStatusText(resp)
    console.log(respBody.errors[0].fields)
    console.log(respBody.errors[0].fields[0].field)
    verifyWrongFormat(
        respBody, 
        respMessage.codeInvalidInput,
        respMessage.msgIncorrect, 
        respMessage.fieldPass, 
        respMessage.errorIncorrectPass
    )
})

test('Login Fail : Blank Username' , async({request}) => {
    const resp = await loginFrontF1(login.blankUsername, login.usernameTypeEmail, login.password, login.phoneCode,request)

    const respBody = await resp.json()
    console.log(respBody)
    console.log(respBody.errors[0].fields)
    verifyStatusCode200(resp)
    verifyNoInputData(respBody)
        // verifyNoUnputData(
    //     respBody,
    //     respMessage.codeInvalidInput,
    //     respMessage.msgIncorrect,
    //     respMessage.fieldUsername,
    //     respMessage.errorRequireUsername,
    //     respMessage.fieldUsername,
    //     respMessage.errorUsernameEmpty,
    //     respMessage.fieldUsername,
    //     respMessage.errorUsernamewithSpace,
    //     respMessage.fieldUsername,
    //     respMessage.errorIncorrectFormat,   
    // )

})