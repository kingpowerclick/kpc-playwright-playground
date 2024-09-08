export enum usernameType {
        email = 'EMAIL',
        phoneNumber = 'MOBILE_NO',
}


export const resource = {
    baseURL: 'https://pd1-graph.firster.kpc-dev.com/graphql' ,
    login: {
            usernameEmail: "mai@test.com" ,
            usernamePhone: "652236926",
            wrongEmail: "mai@te.com",
            blankUsername: ' ' ,
            usernameTypeEmail: usernameType.email ,
            usernameTypePhone: usernameType.phoneNumber ,
            password: "F1mai123" ,
            invalidPass: "mai123",
            wrongFormatPass: "F1m",
            phoneCode: "0652236926"
        },
    myProfile: {
            gender: null,
            phoneCode: "THA-66",
            mobileNumber: "652236926",
            isMobileNumberActive: true,
            email: "mai@test.com",
            havePassword: true,
            customerId: "652bc0f3-3989-4e64-b081-ada59715a603",
            isFirsterConsentAccepted: true,
            isFirsterMemberConsentAccepted: false,
            isMarketingConsentAccepted: false,
            member: null
        },
    responseMessage: {
        codeInvalidInput: "login_invalid_input",
        msgIncorrect: "Phone number or email or password was incorrect, Please try again.",
        fieldPass: "Password",
        fieldUsername: "Username",
        errorMobileWrongFormat: "Mobile number must equal 9 characters",
        errorIncorrectPass: "Incorrect password format.",
        errorIncorrectFormat: "Email format not correct",
        errorRequireUsername: "Require username" ,
        errorUsernameEmpty: "'Username' must not be empty.",
        errorUsernamewithSpace: "Email must not contain whitespace",
        }
}


