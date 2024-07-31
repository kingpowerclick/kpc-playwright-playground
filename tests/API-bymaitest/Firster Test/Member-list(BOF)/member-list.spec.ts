import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { loginBOF } from "./function";

const login = resource.login;

test.beforeAll('Login BOF by My ID' , async({request}) => {
    const resp = await loginBOF(login.username, login.password, request)

    const respBody = await resp.json()
    console.log(respBody)
    expect(respBody).toHaveProperty("accessToken")

})