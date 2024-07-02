import { expect, test } from "@playwright/test";
import { dataApi } from "./api.data.ts";
import { verifyStatusCode, verifyResponseDataGetUser } from "./api.function.ts";

// const verifyResponse = new VerifyResponse();
const dataRes = dataApi.getData;
const dataReg = dataApi.register;
const dataUserList = dataApi.userData;

test("should able to login via api", async ({ request }) => {
  const resp = await request.get(`${dataRes.baseUrl}/users?page=2`);
  const respBody = await resp.json();
  await verifyStatusCode(resp);
  await verifyResponseDataGetUser(respBody);
});

test("should login successfully", async ({ request }) => {
  const response = await request.post(`${dataRes.baseUrl}/login`, {
    data: {
      dataReg,
    },
  });
  // Add assertions based on API response
  await verifyStatusCode(response);
  const responseData = await response.json();
  expect(responseData).toHaveProperty("token");
});
