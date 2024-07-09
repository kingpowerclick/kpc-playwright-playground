import { expect, APIResponse } from "@playwright/test";
import { dataApi } from "./api.data";

export const verifyStatusCode = (response: APIResponse) => {
  expect(response.status()).toEqual(200);
};

export const verifyResponseDataGetUser = (
  resp: any,
  page: number,
  per_page: number,
  total: number,
  total_pages: number
) => {
  const dataUser = dataApi.userData;

  expect(resp.page).toEqual(page);
  expect(resp.per_page).toEqual(per_page);
  expect(resp.total).toEqual(total);
  expect(resp.total_pages).toEqual(total_pages);

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
