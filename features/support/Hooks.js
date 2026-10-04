
const { chromium } = require('playwright');
const { POManager } = require('../../PageObjects/POManager');
const {After, Before,BeforeStep,AfterStep,Status} = require('@cucumber/cucumber');

Before(async function () {
   const browser = await chromium.launch({
    headless:false
   })
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(function () {
  // Assuming this.driver is a selenium webdriver
 console.log("I am last to execute")
})

BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
  console.log("I am executing before everytym")
});

AfterStep(async  function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path:'screenshot_cucu.png'})
  }
});