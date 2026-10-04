// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  timeout:40*1000,
  expect: {
    timeout:5000,
  },
 
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://eventhub.rahulshettyacademy.com',
    actionTimeout:10000,
    navigationTimeout:30*1000,
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'on',
   
  },

});

   module.exports=config 

