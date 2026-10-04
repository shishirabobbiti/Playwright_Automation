import{LoginPage} from './LoginPage';
import{DashboardPage} from './DashboardPage';
import{CartPage} from '../PageObjects ts/CartPage';
import{OrderReviewPage} from '../PageObjects ts/OrderReviewPage';
import{OrderHistoryPage} from './OrderHistoryPage';
import{Page} from '@playwright/test';
export class POManager {

    page: Page;
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    orderReviewPage:OrderReviewPage;
    orderHistoryPage:OrderHistoryPage;

    constructor(page: Page) {
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

