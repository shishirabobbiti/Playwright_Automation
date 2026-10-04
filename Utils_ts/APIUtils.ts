export class APIUtils {
    apiContext:any;
    loginpayLoad:string;
    constructor(apiContext:any, loginpayLoad:string) {
        this.apiContext = apiContext;
        this.loginpayLoad = loginpayLoad;
    }
 

    async getToken() {
        const loginresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginpayLoad
        }); // 200, 201
        const loginResponseJson = await loginresponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }
        async createOrder(orderPayLoad:string) {
        let response = {token:String,orderId:String};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const  orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
 
        return response;
    }
}
 
module.exports = { APIUtils };