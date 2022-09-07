Feature: Testing Intro Screens Scenarios.

  @ff001_tc04 @androidApp @iosApp
  Scenario: Navigation to all intro screen steps.
    Given I launch the app
    When I click on "Login" button
    Then I navigate to login screen to enter valid login credentials
    Then I navigate to all Intro screens
    Then I navigate to default Home screen
