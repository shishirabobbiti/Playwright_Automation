const{test,expect,request}=require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');
const loginpayload={userEmail: "shishira@gmail.com", userPassword: "Ilovemymom@143"};
const orderpayload={orders: [{country: "Australia", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response;
test.beforeAll( async()=>
    {
   const apiContext=await request .newContext();
   const apiUtils=new APIUtils(apiContext,loginpayload);
   response=await apiUtils.createOrder(orderpayload);

   
   });
test('Cleint App login',async({page})=>
{
    page.addInitScript(value =>{ 
        window.localStorage.setItem('token',value);
    },response.token);
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("//button[@routerlink='/dashboard/myorders']").click();
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
for(let i=0;i<await rows.count();i++){
   const rowOrderId=await rows.nth(i).locator("th").textContent();
   if(response.orderId .includes(rowOrderId)){
     console.log("OrderId is available")
     await rows.nth(i).locator("//td//button[text()='View']").click();
     break;
   }
}
const orderIdDetails=await page.locator(".col-text").textContent();
await page.pause();
expect (response.orderId.includes(orderIdDetails)).toBeTruthy()

});