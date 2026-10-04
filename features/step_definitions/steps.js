const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../PageObjects/POManager');
//const { test, expect} = require('playwright/test');
//const{playwright} = require('playwright/test');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');


Given('a login  to Ecommerce application with {string} and {string}',{timeout:100*1000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
   // const browser = await playwright.chromium.launch();
    const loginPage = this.poManager.getLoginpage();
    await loginPage.goto();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProducts(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter valid details {string},{string},{string},{string} and place the order', async function (countryCode,countryName,cvvNumber,name) {
    // Write code here that turns the phrase above into concrete actions
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.searchCountryAndSelect(countryCode, countryName, cvvNumber, name);
    this.orderId = await orderReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the orderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await this.dashboardPage.navigateToOrders();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy()
});

Given('a login  to Ecommerce2 application with {string} and {string}', async function (username, pass) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  const userName=this.page.locator("//input[@id='username']");
  const password=this.page.locator("input#password");
  await userName.fill(username); //xpath
  await password.fill(pass);//css
  await this.page.locator("input#signInBtn").click();
});

Then('Verify Error message is displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});