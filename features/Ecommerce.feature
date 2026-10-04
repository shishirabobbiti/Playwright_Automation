Feature: Ecommerce Validations
@Regression
  Scenario: placing the Order
    Given a login  to Ecommerce application with "shishira@gmail.com" and "Ilovemymom@143"
    When  Add "ZARA COAT 3" to cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details "ind","India","322","Shishira" and place the order
    Then Verify order is present in the orderHistory

 @Validation
  Scenario Outline:  Error Message validation
    Given a login  to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username | password |
        | Shishira  | Learning@830$3mK2  | 
        | rahulshetty  | Learning@830$3mK2 |