Feature: Ecommerce Validations
 @Validation
  Scenario Outline:  Error Message validation
    Given a login  to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username | password |
        | Shishira  | Learning@830$3mK2  | 
        | rahulshetty  | Learning@830$3mK2 |