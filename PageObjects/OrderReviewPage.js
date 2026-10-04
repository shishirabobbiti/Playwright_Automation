const { expect } = require("@playwright/test");
class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submit = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.country = page.locator("//input[@placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.cvvCode = page.locator("//div[text()='CVV Code ']//parent::div//following-sibling::input");
        this.cardName = page.locator("//div[text()='Name on Card ']//parent::div//following-sibling::input")
    }
    async searchCountryAndSelect(countryCode, countryName,cvvNumber,name) {

        await this.cvvCode.fill(cvvNumber);
        await this.cardName.fill(name);
         await this.country.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
async VerifyEmailId(username)
{
    await expect(this.emailId).toHaveText(username);
}

async SubmitAndGetOrderId()
{
 await this.submit.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 return await this.orderId.textContent();
}
}
module.exports = { OrderReviewPage};
    
