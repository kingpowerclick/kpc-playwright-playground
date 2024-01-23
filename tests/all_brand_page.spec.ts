import { test, expect } from '@playwright/test';
import { BrandPage } from '../page/brandPage';
import { data } from '../data/allBrandPageData';

test('go to all brands and click any brand', async ({ page }) => {
    test.setTimeout(120000);
    const getAllBrandPage = new BrandPage(page);
    await getAllBrandPage.goToAllBrandPage(data.allBrandPageUrl);
    await getAllBrandPage.clickBrand(data.brandName111SKIN);
    await expect(getAllBrandPage.BrandNameTitle).toContainText(data.brandName111SKIN)
  });