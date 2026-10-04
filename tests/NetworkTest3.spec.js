const{test,expect}=require('playwright/test');


test.only('Browser Context Playwright test',async({browser})=>
{
  
 const context= await browser.newContext();
 const page= await context.newPage();
 page.route('**/*.css',route=> route.abort())
 page.route('**/*.{jpg,png,jpeg}',route=>route.abort())
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  const userName=page.locator("//input[@id='username']");
  const password=page.locator("input#password");
  await userName.fill("Shishira"); //xpath
  await password.fill("Learning@830$3mK2");//css
  await page.locator("input#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await page.locator("input#signInBtn").click();
  page.on('request',request=>console.log('Request URL:',request.url()))
  page.on('response',response=>console.log(response.url(),response.status()));
   page.on('response', response => {

        if (response.status() >= 400) {
            console.log(
                'FAILED:',
                response.status(),
                response.url()
            );
        }

    });
  console.log(await page.locator("//h4[@class='card-title']//a[text()='iphone X']").textContent());
  //css
 console.log( await page.locator(".card-title a").first().textContent());
 console.log( await page.locator(".card-title a").nth(1).textContent());
 console.log(await page.locator(".card-title a").allTextContents() );
});




