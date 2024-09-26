Feature: launch browser

  @JIRA-123
  Scenario: launch browser
    When I navigate to the url "https://www.google.com"
    Then I should see the title "Google"


  @JIRA-123
  Scenario: google
    When I navigate to the url "https://www.google.com"
    Then I should see the title "Google"

  @JIRA-123
  Scenario: abc
    When I navigate to the url "https://www.google.com"
    Then I should see the title "Google"


  @JIRA-123
  Scenario: sdf
    When I navigate to the url "https://www.google.com"
    Then I should see the title "Google"

  @focus @JIRA-123
  Scenario: ffd
    When I navigate to the url "https://www.google.com"
    And I take a before screenshot
    And I should see the title "Google"
    And I set the search
    And I take an after screenshot
    And the page should look the same


  @JIRA-123
  Scenario: xsz
    When I navigate to the url "https://www.google.com"
    Then I should see the title "Google"