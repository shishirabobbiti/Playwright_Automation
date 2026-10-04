import{test, expect,Locator,Page} from '@playwright/test';

export class CartPage {
      page: Page;
      cartProducts:Locator;
      checkoutButton:Locator;

    constructor(page:Page) {
        this.page = page;
        this.cartProducts = page.locator("//div//li").first();
        this.checkoutButton = page.locator("text=Checkout");

    }

    async VerifyProductIsDisplayed(productName:string) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    getProductLocator(productName:string) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async Checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };