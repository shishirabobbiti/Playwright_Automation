import {test as baseTest} from '@playwright/test'
interface TestDataForOrder{
     username: string;
        password: string;
        productName: string;
        countryCode: string;
        countryName: string;
        cvvNumber: any;
        name: string;
}
export const customTest=baseTest.extend<{testDataForOrder :TestDataForOrder}>
( { 
    testDataForOrder: {
        username: "shishira@gmail.com",
        password: "Ilovemymom@143",
        productName: "ZARA COAT 3",
        countryCode: "ind",
        countryName: "India",
        cvvNumber: "322",
        name: "shishira"
    }

})