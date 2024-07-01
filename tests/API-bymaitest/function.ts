import { expect, APIResponse } from "@playwright/test";
import { resource } from "./data";

export class VerifyResponse {
  async verifyStatusCode(response: APIResponse): Promise<void> {
    await expect(response.status()).toEqual(200);
    // Assuming status() is a function that retrieves the status code from APIResponse
  }

  async verifyResponseDataGetUser(
    resp: any,
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    dataRes: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
    }[]
  ): Promise<void>