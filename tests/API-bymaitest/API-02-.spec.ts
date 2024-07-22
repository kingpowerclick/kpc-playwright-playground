import { expect, test } from "@playwright/test";

// Regres.in
test('GET - Single User' , async ({request}) => {
    const resp = await request.get ('https://reqres.in/api/users/2')

    expect(resp.status()).toBe(200);
    /*const respBody = await resp.text();  // ทดลองใช้ text แทน json
    //expect(respBody).toHaveProperty('id');
    expect(respBody).toContain('Janet');
    console.log(respBody) */

    const respBody = await resp.json();  
    //expect(respBody).toHaveProperty('id');
    expect(respBody).toContain('Janet');
    console.log(respBody)
})