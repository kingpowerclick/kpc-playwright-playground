import { expect, type Locator, type Page } from '@playwright/test';

export class  BrandPage {
    readonly page: Page;
    readonly BrandNameTitle: Locator;

    constructor(page: Page){
        this.page = page;
        this.BrandNameTitle = page.locator('#brand-page-product-list-result-header')
    }

    async goToAllBrandPage(url) {
        await this.page.goto(url);
    }

    async clickBrand(brandName: string){
        await this.page.getByRole('link', { name: brandName }).click();
        await this.BrandNameTitle.click();
        await expect(this.page.locator('#brand-page-product-list-result-header')).toBeVisible();
    }
}