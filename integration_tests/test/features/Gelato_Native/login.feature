Feature: Testing Login Scenarios.

    @ff001_tc02 @androidApp @iosApp
    Scenario: Un Successful login
        Given I launch the app
        When I click on "button_sign_in" button
        Then I navigate to login screen to enter invalid login credentials
        Then I confirm alert

    @ff001_tc03 @androidApp @iosApp
    Scenario: Navigating back
        # commented due to bug https://gelato.atlassian.net/browse/ANA-516
        # Then I click on back button on browser to go back on the first screen of app
        # When I click on "Login" button
        Then I click on X button to go back on the first screen of app

    @ff001_tc01 @androidApp @iosApp
    Scenario: Successful login
        When I click on "Login" button
        Then I navigate to login screen to enter valid login credentials
        Then I confirm I logged into the application
        Then I navigate to all Intro screens
        Then I click on "Catalog" menu button
        Then I click on "More" menu button
        Then I confirm title of the page is "More"
        Then I logout from the app

    @ff001_tc04 @androidApp @iosApp
    Scenario: Google login
        When I click on "Continue with Google" button
        Then I navigate to Google screen to enter credentials
        Then I confirm I logged into the application
        Then I click on "Catalog" menu button
        Then I click on "More" menu button
        Then I confirm title of the page is "More"
        Then I logout from the app

    @ff001_tc04 @androidApp @iosApp
    Scenario: Facebook login
        When I click on "Continue with Facebook" button
        Then I navigate to Facebook screen to enter credentials
        Then I confirm I logged into the application
        Then I click on "Catalog" menu button
        Then I click on "More" menu button
        Then I confirm title of the page is "More"
        Then I logout from the app


