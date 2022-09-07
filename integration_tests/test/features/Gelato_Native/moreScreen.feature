Feature: Testing More Screens Scenarios.

    @ff006_tc05 @androidApp @iosApp
    Scenario: Terms & Conditions Link
        Given I launch the app
        When I click on "Login" button
        Then I navigate to login screen to enter valid login credentials
        Then I navigate to all Intro screens
        Then I navigate to default Home screen
        Then I click on "Catalog" menu button
        Then I click on "More" menu button
        Then I confirm title of the page is "More"

        When I click on "Terms and conditions" button
        Then I verify link of "Terms and conditions" is working successfully

    @ANA-654 @androidApp @iosApp
    Scenario: Language section
        When I click on "language_item" button
        Then I verify "language_en" is default selected option
        Then I confirm title of the page is "Language"
        Then I select each language to verify its title
        Then I go back to previous screen

    @ANA-659 @androidApp @iosApp
    Scenario: Notification section
        Then I click on "notifications_item" button
        Then I click on each notification to confirm its status
        Then I go back to previous screen

    @ANA-639 @androidApp @iosApp
    Scenario: Send feedback
        When I click on "send_feedback_item" button
        Then I verify feedback can be submitted successfully

    @ANA-633 @androidApp @iosApp
    Scenario: Rating
        When I click on "rate_this_app_item" button
        Then I verify rating page is displayed

    @ANA-657 @androidApp @iosApp
    Scenario: Support Link
        When I click on "Support" button
        Then I verify link of "Support" is working successfully

    @ff006_tc08 @androidApp @iosApp
    Scenario: Policies Link
        When I click on "Policies" button
        Then I verify link of "Policies" is working successfully

    @ANA-679 @androidApp @iosApp
    Scenario: Cancel logout
        Then I cancel logout of the app
