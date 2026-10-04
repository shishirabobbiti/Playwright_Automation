class LoginPage{

    constructor(page){
        this.page=page;
        this.signInButton=page.locator("//input[@name='login']");
        this.username=page.locator("//input[@id='userEmail']")
        this.password=page.locator("input#userPassword"); 
    }
   async goto(){
       await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

 async validLogin(username,password){
      await this.username.fill(username);
      await this.password.fill(password);
      await this.signInButton.click();
      await this.page .waitForLoadState('networkidle');
 }

}
module.exports = {LoginPage};