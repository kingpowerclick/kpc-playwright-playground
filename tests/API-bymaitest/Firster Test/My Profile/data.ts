export enum usernameType {
        email = 'EMAIL',
        phoneNumber = 'MOBILE_NO',
}


export const resource = {
    baseURL: 'https://pd1-graph.firster.kpc-dev.com/graphql' ,
    login: {
            username: "mai@test.com" ,
            usernameTypeEmail: usernameType.email ,
            usernameTypePhone: usernameType.phoneNumber ,
            password: "F1mai123" ,
            phoneCode: "0652236926"
    },
    myProfile: {
            gender: null,
            phoneCode: "THA-66",
            mobileNumber: "652236926",
            isMobileNumberActive: true,
            email: "mai@test.com",
            havePassword: true,
            customerId: "c5f9bd2e-3908-4a2b-884a-0fcf4c8995a3",
            isFirsterConsentAccepted: true,
            isFirsterMemberConsentAccepted: false,
            isMarketingConsentAccepted: false,
            member: null

    }
}


