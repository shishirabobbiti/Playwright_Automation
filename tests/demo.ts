import { expect, type Locator, type Page } from '@playwright/test';

let message1:string="Hello"
console.log(message1)
let age1:number=33
console.log(age1)
let numbers1:number[]=[1,2,3]
let data:any="assign any data type"
data=30
function add1(a:number,b:number):number
{
    return a+b
}
console.log(add1(3,5))

let user1:{name:string,age:number,location:string}={name:"Bob",age:33,location:"Hyderabad"};

class CartPage {
     page: Page;
     cartProducts:Locator;
     checkoutButton:Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartProducts = page.locator("//div//li").first();
        this.checkoutButton = page.locator("text=Checkout");

    }

}