import{test, expect,Locator,Page} from '@playwright/test';
export class OrderHistoryPage {
            page: Page;
            orderTable: Locator;
            rows: Locator;
            orderIdDetails:Locator;
    constructor(page: Page) {
        this.page = page;
        this.orderTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text")

    }
    async searchOrderAndSelect(orderId:any) {
        await this.orderTable.waitFor();
        for (let i = 0; i < await this.rows.count(); i++) {
            let rowOrderId:any;
             rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (rowOrderId.includes(rowOrderId)) {
                console.log("OrderId is available")
                await this.rows.nth(i).locator("//td//button[text()='View']").click();
                break;
            }
        }

    }
    async getOrderId() {
        return await this.orderIdDetails.textContent();

    }
}
module.exports = { OrderHistoryPage };