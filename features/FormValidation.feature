Feature: Checkout form validation
  As a shopper
  I want the checkout form to validate my information
  So that I cannot proceed without providing required details

  Background:
    Given the user is logged in as a standard customer
    And the user has proceeded to the checkout information form

  Scenario: Submitting the checkout form with no information
    When the user submits the checkout form without entering any details
    Then the user should see the error message "Error: First Name is required"

  Scenario: Submitting the checkout form without a last name
    When the user submits the checkout form with only a first name "Tri"
    Then the user should see the error message "Error: Last Name is required"

  Scenario: Submitting the checkout form without a postal code
    When the user submits the checkout form with first name "Tri" and last name "Romadon"
    Then the user should see the error message "Error: Postal Code is required"

  Scenario: Successfully completing the checkout form
    When the user submits the checkout form with first name "Tri", last name "Romadon" and postal code "12345"
    Then the user should proceed to the order overview
