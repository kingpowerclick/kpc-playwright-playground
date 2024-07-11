import { expect, test } from "@playwright/test";
import { resource } from "./data";
import {
  //   verifyBookingDetails,
  //   verifyBookingID,
  verifyStatusCode,
} from "./function";
import { request } from "http";
let userID: string;
let bookingList = new Array(); //เป็นการประกาศตัวแปรประเภท array หรือจะเขียนเป็น let bookingID = [] ;

test("POST - create booking & Verify success", async ({ request }) => {
  const resp = await request.post(`${resource.baseURL}/booking`, {
    data: {
      firstname: "Fluke",
      lastname: "Wara",
      totalprice: 9000,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-12",
      },
      additionalneeds: "Breakfast",
    },
  });

    const respBody = await resp.json();
    verifyStatusCode(resp);
    expect(respBody).toHaveProperty("bookingid");
    console.log(respBody);
    expect(respBody.booking).toHaveProperty("additionalneeds");
    expect(respBody.booking.firstname).toEqual("Fluke");
    // bookingList.push(respBody); // วิธีเพิ่มข้อมูลเข้าไปใน array จะเป็นการเพิ่มข้อมูลต่อท้ายเข้าไปใน array เป็นการเพิ่ม respBody เข้าไปในตัวแปร bookingList
    userID = respBody.bookingid;

        //Verify - Get bookingDetails:  เพื่อเช็ครายการที่ Post ไปก่อนหน้าว่ามาแสดงถูกต้อง
    const verifyresp = await request.get(`${resource.baseURL}/booking/${userID}`)
    const verifyrespBody = await verifyresp.json()
    console.log(verifyrespBody)
    expect(verifyrespBody.firstname).toEqual('Fluke')

        //Verify - Get booking by Name เพื่อเช็คว่า มี bookingID นี้ถูกไหม
    const respFluke = await request.get(`${resource.baseURL}/booking?firstname=Fluke`) //หรือจะใส่ firstname เป็น params ก็ได้
    const respBodyFluke = await respFluke.json()
    console.log("bookingid", respBodyFluke);
    expect(respBodyFluke).toEqual(expect.arrayContaining([expect.objectContaining({ bookingid: userID })]))

});

//หลัง create เสร็จ ตั้งให้ ลบข้อมูลนั้นออกทุกครั้ง ใช้ afterAll
test.afterAll(async ({ request }) => {
  const response = await request.delete(
    `${resource.baseURL}/booking/${userID}`,
    {
      headers: {
        ContentType: "application/json",
        Authorization: "Basic YWRtaW46cGFzc3dvcmQxMjM=",
      },
    }
  );
  const respBody = await response.text();
  console.log(respBody);
  verifyStatusCode(response);
  expect(respBody).toEqual("Created");
});
