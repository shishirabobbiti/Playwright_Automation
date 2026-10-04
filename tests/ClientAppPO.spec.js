const{test,expect}=require('playwright/test');
const{customTest}=require('../Utils/TestData_Fixture.js')
const { POManager } = require('../PageObjects/POManager');
//JSON->string_>js object
const dataset=JSON.parse(JSON.stringify(require('../Utils/TestData_PO.json')));


for(const data of dataset){
   test(`Online shopping for ${data.productName}`,async({page})=>
{
const poManager = new POManager(page);
const loginPage = poManager.getLoginpage();
const dashboardPage = poManager.getDashboardPage();
const cartPage = poManager.getCartPage();
const orderReviewPage = poManager.getOrderReviewPage();
const orderHistoryPage = poManager.getOrderHistoryPage();
await loginPage.goto();
await loginPage.validLogin(data.username,data.password);
await dashboardPage.searchProducts(data.productName);
await dashboardPage.navigateToCart();
await cartPage.VerifyProductIsDisplayed(data.productName);
await cartPage.Checkout();
await orderReviewPage.searchCountryAndSelect(data.countryCode, data.countryName,data.cvvNumber,data.name);
const orderId = await orderReviewPage.SubmitAndGetOrderId();
console.log(orderId);
await dashboardPage.navigateToOrders();
await orderHistoryPage.searchOrderAndSelect(orderId);
expect (orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()

});
}


customTest.only('Online shopping',async({page,testDataForOrder})=>
{
const poManager = new POManager(page);
const loginPage = poManager.getLoginpage();
const dashboardPage = poManager.getDashboardPage();
const cartPage = poManager.getCartPage();
const orderReviewPage = poManager.getOrderReviewPage();
const orderHistoryPage = poManager.getOrderHistoryPage();
await loginPage.goto();
await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
await dashboardPage.searchProducts(testDataForOrder.productName);
await dashboardPage.navigateToCart();
await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
await cartPage.Checkout();
await orderReviewPage.searchCountryAndSelect(testDataForOrder.countryCode, testDataForOrder.countryName,testDataForOrder.cvvNumber,testDataForOrder.name);
const orderId = await orderReviewPage.SubmitAndGetOrderId();
console.log(orderId);
await dashboardPage.navigateToOrders();
await orderHistoryPage.searchOrderAndSelect(orderId);
expect (orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()

});

