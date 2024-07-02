import { expect, APIResponse } from "@playwright/test";
import { dataApi } from "./api.data";

export const verifyStatusCode = (response: APIResponse) => {
  expect(response.status()).toEqual(200);
};
// export class VerifyResponse {
//   async verifyStatusCode(response: APIResponse): Promise<void> {
//     if (response.status() == 200) {
//       await expect(response.status()).toEqual(200);
//     } else {
//       await expect(response.status()).toEqual(404);
//     }
//     // Assuming status() is a function that retrieves the status code from APIResponse
//   }

export const verifyResponseDataGetUser = (resp: any) => {
  const dataExp = dataApi.getData;
  const dataUser = dataApi.userData;

  expect(resp.page).toEqual(dataExp.page);
  expect(resp.per_page).toEqual(dataExp.per_page);
  expect(resp.total).toEqual(dataExp.total);
  expect(resp.total_pages).toEqual(dataExp.total_pages);

  // Using filter to find items with id === 7
  let dataArr = resp.data;
  let items = dataArr.filter((item: { id: number }) => item.id === 7);

  // Using forEach to iterate over filtered items
  items.forEach(
    (element: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    }) => {
      // Asserting element.id === 7

      dataUser.forEach((data: any) => {
        // Asserting individual properties of each data object
        expect(element.id).toEqual(data.id);
        expect(element.email).toEqual(data.email);
        expect(element.first_name).toEqual(data.first_name);
        expect(element.last_name).toEqual(data.last_name);
      });
    }
  );
};
// }
