const{test,expect}=require('playwright/test');


test('Browser Context Playwright test',async({browser})=>
{
  
 const context= await browser.newContext();
 const page= await context.newPage();
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
  console.log(await page.locator("//h4[@class='card-title']//a[text()='iphone X']").textContent());
  //css
 console.log( await page.locator(".card-title a").first().textContent());
 console.log( await page.locator(".card-title a").nth(1).textContent());
 console.log(await page.locator(".card-title a").allTextContents() );
});


test('First Playwright test',async({page})=>
{
 await page.goto("https://google.com");
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");
});

test('UI controls',async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const userName=page.locator("//input[@id='username']");
      const password=page.locator("input#password");
      const dropdown=page.locator("select.form-control");
      const documentlink=page.locator("[href*='documents-request']");
      await dropdown.selectOption("consult");
      await page.locator(".radiotextsty").last().click();
      await page.locator("//button[@id='okayBtn']").click();
      console.log(page.locator(".radiotextsty").last().isChecked());
      await expect(page.locator(".radiotextsty").last()).toBeChecked();
      await page.locator("#terms").click();
      await expect(page.locator("#terms")).toBeChecked();
      await page.locator("#terms").uncheck();
      expect(await page.locator("#terms").isChecked()).toBeFalsy();
      await expect(documentlink).toHaveAttribute("class", "blinkingText");
      await page.pause();


});

test('Child windows Handling',async({browser})=>
{
      const context=await browser.newContext();
      const page=await context.newPage();
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const userName=page.locator("//input[@id='username']");    
      const documentlink=page.locator("[href*='documents-request']");
      const [newpage]=await Promise.all(
[
      context.waitForEvent('page'),
      documentlink.click(),
])
     const text=await newpage.locator(".red").textContent();
     console.log(text);
     const arrayText=text.split('@')
     const domain=arrayText[1].split(" ")[0];
     console.log(domain);
     await userName.fill(domain);
     //console.log(await userName.textContent());//it won't work because textContent will not give dynamic values
     console.log(await userName.inputValue());
     await page.pause();

});

