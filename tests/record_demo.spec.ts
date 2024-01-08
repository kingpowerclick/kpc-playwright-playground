import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('https://www.kingpower.com/');
  await page.locator('#modal-banner-close').click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.locator('#signin-text-input-email').click();
  await page.locator('#signin-text-input-email').fill('nattharika.cheewakidakan@kingpower.com');
  await page.locator('#signin-text-input-password').click();
  await page.locator('#signin-text-input-password').fill('Ning@kingpower31@2');
  await page.locator('#signin-text-input-password').press('Enter');
  await page.goto('https://www.kingpower.com/');
  await page.locator('#modal-banner-close').click();
  await page.getByRole('button', { name: 'Nattharika CRYSTAL STAFF' }).click();
  await page.getByRole('link', { name: 'Personal Details' }).click();
  await page.getByRole('button', { name: 'Nattharika CRYSTAL STAFF' }).click();
  await page.locator('p').filter({ hasText: 'Sign out' }).click();
});