Feature: File upload
  As a user
  I want to upload a file
  So that I can share documents through the application

  Background:
    Given the user is on the file upload page

  Scenario: Successfully uploading a file
    When the user selects a file named "sample-upload.txt" to upload
    And the user submits the upload
    Then the page should confirm the file "sample-upload.txt" was uploaded
