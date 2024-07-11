import { expect, test } from "@playwright/test";
import { resource } from "./data";
import { verifyRespUserdata, verifyStatusCode } from "./function";
//import { date } from 'date-and-time' ;

   
let userID;
test.beforeEach('POST - Create User', async ({request}) => {
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
        console.log(responseBody)

        // Keep user id for used : ประกาศตัวแปร userID ที่สร้าง(POST) เก็บไว้เพื่อใช้ทดสอบเคสอื่นต่อ ต้องอยู่ใน func.เดียวกันหรือเคสเดียวกันหรือทำเป็น beforeEach
        userID = responseBody.id;
});      

    //test case ทดสอบอัพเดทข้อมูล user 
    test('PUT - Update User' , async ({request}) => {
        const resp = await request.put(`https://reqres.in/api/users/${userID}` , {  //อย่าลืมใส่จุดเชื่อมโยงข้อมูลที่จะให้มันไปอัพเดทส่วนไหน อันนี้ให้มันไปอัพเดท userID ที่สร้าง หรือเราสามารถใส่ เลข ID คนนั้นได้เลย
            data : {
                "name" : "Sky" ,
                "job" : "Teacher"
            }
        });
 
        expect(resp.status()).toBe (200);  // ส่วนนี้เป็นแค่การเช็คว่า สามารถ edit/update ข้อมูลได้สำเร็จนะ แต่ต้องเช็ค get มาดูอีกที
        const respBody = await resp.json();
        expect(respBody.name).toEqual ("Sky");
        expect(respBody.job).toEqual ("Teacher");  
        console.log(respBody)

    //ต้องมี get data มาดูว่าที่แก้ไข userID นี้ไป ดึงมาแสดงถูกต้อง แต่ API เส้นนี้เหมือนจะเล่นไม่ได้
        // const respCheckget = await request.get(`https://reqres.in/api/users/7`)
        // verifyStatusCode(respCheckget)
        // //console.log("Body from Get" , respCheckget)
        // const respBodyGet = await respCheckget.json();
        // console.log(respBodyGet)
        // expect(respBodyGet.data.first_name).toEqual("Michael")
        // expect(respBodyGet.data.id).toEqual(7);
    
    });


    test('DELETE - User' , async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/2') //ใส่ ID ที่จะให้มันไปลบข้อมูล เคสนี้ userID =2 

    expect(response.status()).toBe (204);
    console.log(response);

    })

    test('PATCH - Update Partial User' , async ({request}) => {
        const resp = await request.patch(`${resource.baseURL}/user/7` , { //หรือจะให้มันอัพเดท userID ที่สร้างไว้ก่อนหน้า `${resource.baseURL}/user/${userID}` or + userID (ต้องอยู่ใน fuc. เดียวกัน)
            data : {
                name : "Mai" , 
                job : "QA"
            }
        })

        const date = require('date-and-time');
        const dateNow = new Date()
        const pattern = date.compile('YYYY-MM-DD');
        const nowDate = date.format(dateNow , pattern);  

        const respBody = await resp.json()
        verifyStatusCode(resp)
        console.log(respBody)
        expect(respBody.name).toEqual("Mai")
        expect(respBody.updatedAt).toContain(nowDate)  //เช็คแค่วันที่ตรงกัน ไม่เช็คเวลา
        console.log(respBody.updatedAt)
        console.log(nowDate)

        //ต้องมี get data มาดูว่าที่แก้ไข userID นี้ไป ดึงมาแสดงถูกต้อง แต่ API เส้นนี้เหมือนจะเล่นไม่ได้


    //ทดลองกรณี ใช้ตัวแปรง timezone ISOString ได้ค่า วันและเวลาเป๊ะๆ 
        // const date = require('date-and-time');
        // const dateNow = new Date().toISOString();
        // const respBody = await resp.json()
        // verifyStatusCode(resp)
        // console.log(respBody)
        // expect(respBody.name).toEqual("Mai")
        // expect(respBody.updatedAt).toContainText(dateNow) //ยังไม่ผ่าน อาจจะเกิดจาก ใช้แปรงเป็น ISOString
        // console.log(respBody.updatedAt)
        // console.log(dateNow)
    })




