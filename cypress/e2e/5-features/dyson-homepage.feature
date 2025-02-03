Feature: Dyson Homepage Regression Tests

  Background: Sign into NBS and visit the manufacturer home page
    Given I sign into NBS and visit the manufacturer home page

    

# Scenario Outline: Verify URL contains expected text
#     Then The URL will contain the expected text "<expectedText>"

#     Examples:
#       | expectedText           |
#       | /manufacturer/dyson/   |
#       # | /overview              |

#   Scenario Outline: Verify URL contains expected text
#     Then The URL will contain the expected text "<expectedText>"

#     Examples:
#       | expectedText           |
#       | /manufacturer/dyson/   |
#       | /overview              |

#   Scenario Outline: I verify the telephone link attribute
#     Then The number will be correct, the href will be as expected, and the telephone protocol will correct "<telNo>"

#     Examples:
#       | telNo             | 
#       | tel:08003457788   | 

#   Scenario Outline: I verify the h1 title text on page
#     Then The h1 title text will be as expected "<h1Text>"

#     Examples:
#       | h1Text        | 
#       | Dyson         |

#   Scenario Outline: I verify the href attribute of the Source logo
#     Then The href attribute of the Source logo will be as expected "<href>"

#     Examples:
#       | href       | 
#       | /          |

#   Scenario Outline: I verify the manufacturer link attribute contains the correct url
#     Then The manufacturer website link is correct "<url>"

#     Examples:
#       | url                                                                       | 
#       | https://www.dyson.co.uk/commercial/overview/architects-designers          |

#   Scenario Outline: I verify the contact manufacturer button shows the correct text
#     Then The button will display the correct text "<btnTxt>"

#     Examples:
#       | btnTxt                  | 
#       | Contact manufacturer    |    

    Scenario: I verify that the manufacturer homepage is accessible
    Then The page should be accessible

