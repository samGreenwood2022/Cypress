Feature: Dyson Homepage Regression Tests

  Background: I visit the manufacturer home page
    Given I visit the manufacturer home page

  Scenario Outline: Verify URL contains expected text
    Then The URL will contain the expected text "<expectedText>"

    Examples:
      | expectedText           |
      | /manufacturer/dyson/   |
      | /overview              |

  Scenario Outline: I verify the telephone link attribute
    Then The number will be correct, the href will be as expected, and the telephone protocol will correct "<telNo>"

    Examples:
      | telNo        | 
      | tel:08003457788   | 

  Scenario Outline: Verify the h1 title text on page
    Then The h1 title text will be as expected "<h1Text>"

    Examples:
      | h1Text        | 
      | Dyson         |