const base = require('playwright/test');

exports.customTest=base.test.extend({
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