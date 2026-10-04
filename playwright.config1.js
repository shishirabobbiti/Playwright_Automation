// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  retries:1,
  workers:2,
  timeout:40*1000,
  expect: {
    timeout:5000,
  },
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
 projects:[ {
    name:'Edge',
    use: {
    actionTimeout:10000,
    navigationTimeout:30*1000,
    browserName:'chromium',
    channel: 'msedge',
    headless:false,
    screenshot:'on',
    trace:'on',
    viewport:{width:720,height:720}
   
  },
},
  {
   name:'Chrome',
    use: {
    actionTimeout:10000,
    navigationTimeout:30*1000,
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    ignoreHttpsError:true, //accept ssl ceritificate
    permissions :['geolocation'], //to allow location ,when popup comes
    trace:'on',
    //...devices['Galaxy S24'], //run in mobile device
    video:'retain-on-failure'
  
  } 
 },
 {
   name:'Safari',
    use: {
    actionTimeout:10000,
    navigationTimeout:30*1000,
    browserName:'webkit',
    headless:false,
    screenshot:'on',
    ignoreHttpsError:true, //accept ssl ceritificate
    permissions :['geolocation'], //to allow location ,when popup comes
    trace:'on',
    ...devices['iPhone 13'], //run in mobile device
    video:'retain-on-failure'
  
  } 
 }] 

});

   module.exports=config 

