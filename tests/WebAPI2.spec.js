const{test,expect}=require('playwright/test');
let webContext;
test.beforeAll(async({browser})=>
{
const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("//input[@id='userEmail']").fill('shishira@gmail.com');
await page.locator("input#userPassword").fill("Ilovemymom@143");
await page.locator("//input[@name='login']").click();
await page .waitForLoadState('networkidle');
await context.storageState({path:'state.json'});
webContext=await browser.newContext({storageState:'state.json'});
}
)

test.only('Client app',async()=>
{
const productName='ZARA COAT 3';
const page=await webContext.newPage();
const products=page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("//div[@class='card-body']//b").first().waitFor();
const titles=await page.locator("//div[@class='card-body']//b").allTextContents();
console.log(titles);

const count=await products.count();
for(let i=0;i<count;i++)
    {
  if(await products.nth(i).locator("b").textContent()==productName){
    await products.nth(i).locator("text=Add to Cart").click();
    break;
  }

}
await page.locator("[routerlink*='cart']").click();
await page.locator("//div//li").first().waitFor();
const bool=page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("//div[text()='CVV Code ']//parent::div//following-sibling::input").fill("323");
await page.locator("//div[text()='Name on Card ']//parent::div//following-sibling::input").fill("shishira");
await page.locator("//input[@placeholder='Select Country']").pressSequentially("Ind");// if it is not working because of any traffic use the below line
//await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
const dropdown=page.locator(".ta-results");
await dropdown.waitFor();
const optionCount= await dropdown.locator("button").count();
for(let i=0;i<optionCount;i++){
const text=await dropdown.locator("button").nth(i).textContent();
  if( text===" India")
{
  await dropdown.locator("button").nth(i).click();
  break;
}
}
await expect(page.locator(".user__name label")).toHaveText('shishira@gmail.com');
await page.locator("text='Place Order '").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId=await page.locator("label.ng-star-inserted").textContent();
console.log(orderId);
await page.locator("//button[@routerlink='/dashboard/myorders']").click();
await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
for(let i=0;i<await rows.count();i++){
   const rowOrderId=await rows.nth(i).locator("th").textContent();
   if(rowOrderId .includes(rowOrderId)){
     console.log("OrderId is available")
     await rows.nth(i).locator("//td//button[text()='View']").click();
     break;
   }
}
const orderIdDetails=await page.locator(".col-text").textContent();
expect (orderId.includes(orderIdDetails)).toBeTruthy()

});


test.only('Test case 2',async()=>
{
const productName='ZARA COAT 3';
const page=await webContext.newPage();
const products=page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("//div[@class='card-body']//b").first().waitFor();
const titles=await page.locator("//div[@class='card-body']//b").allTextContents();
console.log(titles);
});