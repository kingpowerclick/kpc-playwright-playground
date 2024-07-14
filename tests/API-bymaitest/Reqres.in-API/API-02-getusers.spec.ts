import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyRespUserdata, verifyStatusCode } from "./function";

const singleUserData = resource.singleuser

// Regres.in
test('GET - Single User' , async ({request}) => {
    const resp = await request.get ('https://reqres.in/api/users/2')

    expect(resp.status()).toBe(200);
    /*const respBody = await resp.text();  // ทดลองใช้ text แทน json : PASS
    //expect(respBody).toHaveProperty('id');
    expect(respBody).toContain('Janet');
    console.log(respBody) */

    const respBody = await resp.json();  
    expect(respBody).toEqual(singleUserData);
    console.log(respBody)
    console.log(singleUserData)
})

test('GET - All Users' , async ({request}) => {
    const resp = await request.get (`${resource.baseURL}/users?page=2`)
    const respBody = await resp.json();
    verifyStatusCode(resp) ;
    console.log(respBody)
    verifyRespUserdata(respBody);
    
})

test('GET - User Not found', async ({request}) => {
    const resp = await request.get (`${resource.baseURL}/users/23`)
    const respBody = await resp.json();
    verifyStatusCode(resp);
    console.log(respBody)
    expect(respBody).toEqual({});
})

test('GET - Users ID 7 ' , async ({request}) => {
    const resp = await request.get (`${resource.baseURL}/users/7`)
    const respBody = await resp.json();
    verifyStatusCode(resp) ;
    console.log(respBody)
    expect(respBody.data.first_name).toEqual('Michael')
    expect(respBody.data.last_name).toBe('Lawson')
    expect(respBody.data.email).toBeTruthy()  //.ใช้สำหรับเช็คค่าว่ามี value อยู่มั้ยแค่นั้น เป็นค่าอะไรก็ได้ที่ไม่ใช่พวก null , 0 ต่างๆก็จะ Fail กลับกันให้ใช้ Falsty 
                                                //ใช้กับค่าที่เปลี่ยนแปลงตลอด เช่นพวก timestamp ,
})