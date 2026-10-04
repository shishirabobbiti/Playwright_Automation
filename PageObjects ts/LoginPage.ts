import{test, expect,Locator,Page} from '@playwright/test';
export class LoginPage{
       page:Page;
       signInButton:Locator;
       username:Locator;
       password:Locator;
    constructor(page :Page){
        this.page=page;
        this.signInButton=page.locator("//input[@name='login']");
        this.username=page.locator("//input[@id='userEmail']")
        this.password=page.locator("input#userPassword"); 
    }
   async goto(){
       await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

 async validLogin(username :string,password:string){
      await this.username.fill(username);
      await this.password.fill(password);
      await this.signInButton.click();
      await this.page .waitForLoadState('networkidle');
 }

}
module.exports = {LoginPage};