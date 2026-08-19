Feature: Dynamic content loading
  As a user
  I want the page to show content once it has finished loading
  So that I only see information that is ready and accurate

  Background:
    Given the user is on the dynamic loading page

  Scenario: Content that is hidden until loading finishes
    When the user starts an element that loads without changing visibility
    Then the loaded content "Hello World!" should eventually be displayed

  Scenario: Content that is only rendered once loading finishes
    When the user starts an element that renders only after loading
    Then the loaded content "Hello World!" should eventually be displayed
