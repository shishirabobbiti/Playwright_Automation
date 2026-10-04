const { LoginPage } = require('../PageObjects/LoginPage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const { CartPage } = require('./CartPage');
const { OrderReviewPage } = require('../PageObjects/OrderReviewPage');
const { OrderHistoryPage } = require('../PageObjects/OrderHistoryPage');
class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page);
    }
    getLoginpage() {
        return this.loginPage;
    }
    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }

    getOrderReviewPage() {
        return this.orderReviewPage;
    }
}
module.exports = { POManager };

