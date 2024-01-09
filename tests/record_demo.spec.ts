import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {  
  test.setTimeout(120000);
  await page.goto('https://www.kingpower.com/');
  await page.locator('#modal-banner-close').click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.locator('#signin-text-input-email').click();
  await page.locator('#signin-text-input-email').fill('testqa45@gmail.com');
  await page.locator('#signin-text-input-password').click();
  await page.locator('#signin-text-input-password').fill('test123123');
  await page.getByRole('button', { name: 'SIGN IN' }).click();
  await page.locator('#modal-banner-close').click();
  await page.locator('#modal-banner-close').click();
  await page.getByRole('button', { name: 'qatest Link Membership' }).click();
  await page.getByText('Sign out').click();
  await page.goto('https://www.kingpower.com/');
});