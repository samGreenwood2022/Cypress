# The main purpose of the project is to demonstrate the following:
#  - Cucumber/Gherkin and Feature file implementation
#  - Page Object Model
#  - Repository created in GitHub
#  - Independant tests
#  - CI Pipeline Integration
#  - Implementation of the Axe-plugin for usability reporting
#  - API Testing
#  - Different ways of interacting and verifying UI element attributes

Feature: Dyson Homepage Regression Tests

  Background: Navigate to the Dyson manufacturer homepage
    Given I navigate to the Dyson manufacturer homepage

  # Scenario Outline: Verify the manufacturers homepage URL contains expected text
  #   Then The URL will contain the expected text "<expectedText>"

  #   Examples:
  #     | expectedText         |
  #     | /manufacturer/dyson/ |
  #     | /overview            |

  # Scenario: I verify the telephone link has the correct number, protocol and href
  #   Then The number will be correct, the href will be as expected, and the telephone protocol will correct "tel:08003457788"

  # Scenario: I verify the h1 title text on page is as expected
  #   Then The h1 title text will be as expected "Dyson"

  # Scenario: I verify the href attribute of the Source logo is as expected
  #   Then The href attribute of the Source logo will be as expected "/"

  # Scenario: I verify the external manufacturer link attribute contains the correct url
  #   Then The manufacturer website link is correct "https://www.dyson.co.uk/commercial/overview/architects-designers"

  # Scenario: I verify the contact manufacturer button shows the correct text
  #   Then The button will display the correct text "Contact manufacturer"

  # Scenario: I run accessibility checks on the manufacturer homepage and report results to console
  #   Then The results of the accessibility checks will be output to the console

  # Scenario: I perform an api test and verify the response and content is as expected
  #   Then I should get a 200 response and output request to the console
  #   And The response should contain the expected email address "Eliseo@gardner.biz"

  # Scenario: I verify the Dyson navigation bar has the correct tabs and expected links
  #   Then The Dyson navigation bar should have the correct tabs and href links

  # Scenario: I verify that the baseline image snapshot matches the current image snapshot
  #   Then The baseline image snapshot should match the current image snapshot

  # Scenario: We will take a look at whats returned in our API response
  #   Then The API response will contain expected data and UI will show location as GB

  Scenario: Ensure we can sign into NBS Source with valid credentials
    Then The user will be able to sign in with valid credentials

