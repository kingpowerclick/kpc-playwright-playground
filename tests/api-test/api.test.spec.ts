import { expect, test } from "@playwright/test";
import { dataApi } from "./api.data.ts";
import {
  verifyStatusCode,
  verifyResponseDataGetUser,
  extractJson,
} from "./api.function.ts";

// const verifyResponse = new VerifyResponse();
const dataRes = dataApi.getData;
const dataReg = dataApi.register;

test("should able to login via api", async ({ request }) => {
  const resp = await request.get(`${dataRes.baseUrl}/users?page=2`);
  await verifyStatusCode(resp);
  const respBody = await resp.json();
  console.log(respBody);
  await verifyResponseDataGetUser(
    await extractJson(resp),
    dataRes.page,
    dataRes.per_page,
    dataRes.total,
    dataRes.total_pages
  );
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
