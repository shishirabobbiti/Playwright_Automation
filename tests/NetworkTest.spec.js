const{test,expect,request}=require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');
const loginpayload={userEmail: "shishira@gmail.com", userPassword: "Ilovemymom@143"};
const orderpayload={orders: [{country: "Australia", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response;
const fakepayloadOrders={data:[],message:"No Orders"};

test.beforeAll( async()=>
    {
   const apiContext=await request .newContext();
   const apiUtils=new APIUtils(apiContext,loginpayload);
   response=await apiUtils.createOrder(orderpayload);

   
   });
test('Network intercept',async({page})=>
{
    page.addInitScript(value =>{ 
        window.localStorage.setItem('token',value);
    },response.token);
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
async route =>
{
   const response=await page.request.fetch(route.request());
   const body=JSON.stringify(fakepayloadOrders);
   route.fulfill(
    {
        response,body
        //   //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
});

await page.locator("//button[@routerlink='/dashboard/myorders']").click();
//await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
console.log(await page.locator(".mt-4").textContent());
});