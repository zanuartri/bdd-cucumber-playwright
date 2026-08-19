Feature: Login
  As a registered user
  I want to log in to my account
  So that I can access secure content

  Background:
    Given the user is on the login page

  Scenario: Successful login with valid credentials
    When the user logs in with username "tomsmith" and password "SuperSecretPassword!"
    Then the user should see a secure area welcome message
    And the user should be able to log out

  Scenario Outline: Rejected login with invalid credentials
    When the user logs in with username "<username>" and password "<password>"
    Then the user should see an error message containing "<message>"

    Examples:
      | username   | password              | message                      |
      | tomsmith   | wrongpassword          | Your password is invalid!    |
      | wronguser  | SuperSecretPassword!   | Your username is invalid!    |
      | wronguser  | wrongpassword          | Your username is invalid!    |
      |            | SuperSecretPassword!   | Your username is invalid!    |
