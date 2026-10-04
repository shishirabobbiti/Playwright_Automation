const { test, expect } = require('playwright/test');
class CartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("//div//li").first();
        this.checkoutButton = page.locator("text=Checkout");

    }

    async VerifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }

    async Checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };