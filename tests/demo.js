let message="Hello"
console.log(message)
message=20
let age=32  
console.log(age)
let numbers=[1,2,3]
function add(a,b){
    return a+b
}
console.log(add(3,5))
var user ={name:"Bob",age:33}
user.location="Hyderabad"

class CartPage {

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("//div//li").first();
        this.checkoutButton = page.locator("text=Checkout");
}

}