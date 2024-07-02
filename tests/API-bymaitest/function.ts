import { expect, APIResponse } from "@playwright/test";
import { resource } from "./data";

export const verifyStatusCode = (response: APIResponse) => {
    if (response.status() == 200) {
    expect(response.status()).toEqual(200);
    }
    else { if(response.status() == 400)
    expect(response.status() == 400)}
}

export const verifyRespUserdata = (
    resp: any,
    /*page: number,
    per_page: number,
    total: number,
    total_pages: number,
    userData: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    }[]*/
  ) => {

    const dataPage = resource.getUserList;
    const dataUser = resource.userData;

    expect(resp.page).toEqual(dataPage.page);
    expect(resp.per_page).toEqual(dataPage.per_page);
    expect(resp.total).toEqual(dataPage.total);
    expect(resp.total_pages).toEqual(dataPage.total_pages);
    //expect(resp.userData.id).toEqual(dataUser.id);

    for (let index = 0; index < dataUser.length; index++) {
        expect(resp.data[index].id).toEqual(dataUser[index].id)
        expect(resp.data[index].email).toEqual(dataUser[index].email)
        expect(resp.data[index].first_name).toEqual(dataUser[index].first_name)
        expect(resp.data[index].last_name).toEqual(dataUser[index].last_name)

    }  
  }

/*export const RespJson = (resp: any) => {  // สร้างตัวแปรประกาศฟังก์ชั่น แปลง json เป็น string และเอาไปใช้ >> ไม่ต้องใช้*
    let data = resp.json();
    return data
}*/ 
 