import { expect, test } from "@playwright/test";
import { dataApi } from "./api.data.ts";
import { verifyResponseDataGetUser } from "./api.function.ts";

// const verifyResponse = new VerifyResponse();
const dataRes = dataApi.getData;
const dataRegister = dataApi.register;

test("should able to login via api", async ({ request }) => {
  let resp = await request.get(`${dataRes.baseUrl}/users?page=2`);
  await expect(resp).toBeOK();
  resp = await resp.json();
  await verifyResponseDataGetUser(
    resp,
    dataRes.page,
    dataRes.per_page,
    dataRes.total,
    dataRes.total_pages
  );
});

test("should login successfully", async ({ request }) => {
  let response = await request.post(`${dataRes.baseUrl}/login`, {
    data: {
      email: dataRegister.email,
      password: dataRegister.password,
    },
  });
  // Add assertions based on API response
  await expect(response).toBeOK();
  response = await response.json();
  expect(response.body).toHaveProperty("token");
  // expect(response.body).toHaveProperty("token",);
});
