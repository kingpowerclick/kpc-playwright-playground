import { expect, test } from "@playwright/test";

//test.describe ใช้สร้างกลุ่มการทดสอบที่ชื่อว่า 'User API Tests' และเก็บตัวแปร userID
test.describe('Manage User API Tests', () => {
    let userID ;
    
    //test() ใช้สร้างเทสเคส+ชื่อ : ทดสอบสร้าง user ใหม่
    test('POST - Create User', async ({request}) => {
        const response = await request.post('https://reqres.in/api/users/',{   // request POST ไปยัง url นี้ โดยส่งข้อมูลรูปแบบ json (name,job)
            data:{
                "name" : "Sea",
                "job": "Archer"
            }
        });

        expect(response.status()).toBe(201); //ใช้ expect เพื่อตรวจสอบสถานะการ response ว่าเป็น 201 = succcess หรือไม่?
        const responseBody = await response.json();  //แปลงข้อมูลการ response เป็น json และตรวจสอบค่า (name,job) ที่ส่งไปว่าตรงกัน
        expect(responseBody.name).toEqual ("Sea"); 
        expect (responseBody.job).toEqual ("Archer");
        expect(responseBody).toHaveProperty('id');  //ตรวจสอบว่าการ Response มี property id ซึ่งบ่งบอกว่าผู้ใช้ถูกสร้างขึ้นเรียบร้อยแล้วหรือยัง
        console.log(response)

        // Keep user id for used
        userID = responseBody.id;
    });      

    //test case ทดสอบอัพเดทข้อมูล user 
    test('PUT - Update User' , async ({request}) => {
        const resp = await request.put('https://reqres.in/api/users/'+ userID , {  //อย่าลืมใส่จุดเชื่อมโยงข้อมูลที่จะให้มันไปอัพเดทส่วนไหน อันนี้ให้มันไปอัพเดท userID ที่สร้าง หรือเราสามารถใส่ เลข ID คนนั้นได้เลย
            data : {
                "name" : "Sky" ,
                "job" : "Teacher"
            }
        });
        
        expect(resp.status()).toBe (200);
        const respBody = await resp.json();
        expect(respBody.name).toEqual ("Sky");
        expect(respBody.job).toEqual ("Teacher");
        console.log(respBody)
    
    });

test('DELETE - User' , async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2')

    expect(response.status()).toBe (204);
    console.log(response)

})




}); 



