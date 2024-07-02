import { expect, APIResponse } from "@playwright/test";
import { resource } from "./data";

export const verifyStatusCode = (response: APIResponse) => {
    if (response.status() == 200) {
    expect(response.status()).toEqual(200);
    }
    else { expect(response.status() == 204)}
}

export const verifyRespUserdata = (
    resp: any,
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    userData: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    }[]
  ) => {
    expect(resp.page).toEqual(page);
    expect(resp.per_page).toEqual(per_page);
    expect(resp.total).toEqual(total);
    expect(resp.total_pages).toEqual(total_pages);
    //expect(resp.userData.id).toEqual(resp.userData.id);

  }

export const RespJson = (resp: any) => {  // สร้างตัวแปรประกาศฟังก์ชั่น แปลง json เป็น string และเอาไปใช้ในเทสเคส *ต้องทำทุกครั้ง
    let data = resp.json();
    return data
}

export const 
    let items = dataArr.filter((item: { id: number }) => item.id === 7);

    // Using forEach to iterate over filtered items
    items.forEach((element: any) => {
      // Asserting element.id === 7
      const dataExp = dataApi.userData;
      // Assuming resData is a predefined array of objects you want to match against
      dataRes.forEach((data: any) => {
        // Asserting individual properties of each data object
        expect(element.id).toEqual(data.id);
        expect(element.email).toEqual(data.email);
        expect(element.first_name).toEqual(data.first_name);
        expect(element.last_name).toEqual(data.last_name);
      });
    });