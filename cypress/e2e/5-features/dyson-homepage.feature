Feature: Dyson Homepage Regression Tests

  Background: I visit the manufacturer home page
    Given I visit the manufacturer home page

  Scenario Outline: Verify URL contains expected text
    Then The URL will contain the expected text "<expectedText>"

  Examples:
    | expectedText           |
    | /manufacturer/dyson/   |
    | /overview              |


  Scenario: Verify telephone link attribute
    Then The number will be correct and the href will be as expected "<numberHref>"

  Examples:
    | numberHref        | 
    | tel:08003457788   | 
