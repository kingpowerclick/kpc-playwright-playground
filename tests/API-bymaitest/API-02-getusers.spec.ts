import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyRespUserdata, verifyStatusCode } from "./function";

// Regres.in
test('GET - Single User' , async ({request}) => {
    const resp = await request.get ('https://reqres.in/api/users/2')

    expect(resp.status()).toBe(200);
    /*const respBody = await resp.text();  // ทดลองใช้ text แทน json : PASS
    //expect(respBody).toHaveProperty('id');
    expect(respBody).toContain('Janet');
    console.log(respBody) */

    const respBody = await resp.json();  
    expect(respBody.data.first_name).toEqual('Janet');
    console.log(respBody)
})

test('GET - All Users' , async ({request}) => {
    const resp = await request.get (`${resource.baseURL}/users?page=2`)
    const respBody = await resp.json();
    await verifyStatusCode(resp) ;
    console.log(respBody)
    await verifyRespUserdata(respBody);
    
})

test('GET - User Not found', async ({request}) => {
    const resp = await request.get (`${resource.baseURL}/users/23`)
    const respBody = await resp.json();
    await verifyStatusCode(resp);
    console.log(respBody)
    expect(respBody).toEqual({});
})

test('GET - Users ID 7 ' , async ({request}) => {
    const resp = await request.get (`${resource.baseURL}/users/7`)
    console.log (await resp.json());
    await verifyStatusCode(resp) ;

})