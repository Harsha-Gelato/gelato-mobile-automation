Feature: Testing Gelato Native App.

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
        # When I click on "button_sign_in" button
        Then I click on X button to go back on the first screen of app

    @ff001_tc01 @androidApp @iosApp
    Scenario: Successful login
        Given I launch the app
        When I click on "button_sign_in" button
        Then I navigate to login screen to enter valid login credentials
        Then I navigate to all Intro screens
        Then I click on "more_navigation_item" menu button
        Then I confirm title of the page is "More"
        Then I logout from the app

    @ff001_tc04 @androidApp @iosApp
    Scenario: Google login
        When I click on "button_sign_in_google" button
        Then I navigate to Google screen to enter credentials
        Then I click on "more_navigation_item" menu button
        Then I confirm title of the page is "More"
        Then I logout from the app

    @ANA-676 @androidApp @iosApp
    Scenario: Successful logout
        Then I navigated to first page of the app

    @ff001_tc04 @androidApp @iosApp
    Scenario: Facebook login
        When I click on "button_sign_in_facebook" button
        Then I navigate to Facebook screen to enter credentials

    @ANA-636 @androidApp @iosApp
    Scenario: Layout of Catalog Screen
        Then I click on "catalog_navigation_item" menu button
        Then I confirm title of the page is "Catalog"
        Then I confirm all catalog list items are present
        Then I confirm all bottom navigation options are present

    @ANA-650 @androidApp @iosApp
    Scenario: Scrolling functionality
        Then I click on "catalog_navigation_item" menu button
        Then I confirm "Men\'s clothing" is "first" catalog item is visible
        Then I scroll down the page from "catalog_category_#0"
        Then I confirm "Tote Bags" is "last" catalog item is visible

    @ANA-631 @ANA-652 @androidApp @iosApp
    Scenario: Men's clothing T-shirt sub-catalog title
        Then I scroll up the page from 'catalog_category_#11'
        When I click on "catalog_category_#0" button
        Then I confirm title of the page is "Men\'s clothing"
        Then I confirm the sub catalogs on "men" catalog page

        When I click on "catalog_category_#0" button
        Then I confirm title of the page is "T-shirts"
        Then I verify "T-shirts" product catalog list appears and the item count is 9
        Then I scroll up the page from "catalog_product_#8"
        Then I verify price of each sub catalog of T-shirts is displayed correctly
        Then I scroll up the page from "catalog_product_#8"

    @ANA-772, @ANA-774, @ANA-773 @androidApp @iosApp
    Scenario: Men's clothing T-shirt sub-catalogs
        Then I verify size, fullfillment summary, color section, artwork preview, shipping cost of each sub catalog of T-shirts is displayed correctly

    @ff006_tc09 @androidApp @iosApp
    Scenario: Terms & Conditions Link
        Then I click on "more_navigation_item" menu button
        Then I confirm title of the page is "More"

        When I click on "terms_and_conditions_item" button
        Then I verify link of "terms_and_conditions_item" is working successfully

    @ANA-654 @androidApp @iosApp
    Scenario: Language section
        When I click on "language_item" button
        Then I verify "language_en" is default selected option
        Then I confirm title of the page is "Language"
        Then I select each language to verify its title
        Then I go back to previous screen

    @ANA-658 @androidApp @iosApp
    Scenario: Currency section
        When I click on "change_currency_item" button
        Then I verify "currency_EUR" is default selected option
        Then I confirm title of the page is "Change currency"
        Then I change currency to "currency_AUD"
        Then I go back to previous screen
        Then I click on "catalog_navigation_item" menu button
        Then I confirm currency of price is displayed in "$"

        Then I click on "more_navigation_item" menu button
        When I click on "change_currency_item" button
        Then I confirm title of the page is "Change currency"
        Then I scroll down the page from "currency_AUD"
        Then I change currency to "currency_JPY"
        Then I go back to previous screen
        Then I click on "catalog_navigation_item" menu button
        Then I confirm currency of price is displayed in "¥"

        Then I click on "more_navigation_item" menu button
        When I click on "change_currency_item" button
        Then I confirm title of the page is "Change currency"
        Then I scroll down the page from "currency_AUD"
        Then I change currency to "currency_KRW"
        Then I go back to previous screen
        Then I click on "catalog_navigation_item" menu button
        Then I confirm currency of price is displayed in "₩"

        Then I click on "more_navigation_item" menu button
        When I click on "change_currency_item" button
        Then I change currency to "currency_EUR"
        Then I confirm title of the page is "Change currency"
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

    @ff006_tc08 @androidApp @iosApp
    Scenario: Policies Link
        When I click on "policies_item" button
        Then I verify link of "policies_item" is working successfully

    @ANA-657 @androidApp @iosApp
    Scenario: Support Link
        When I click on "support_item" button
        Then I verify link of "support_item" is working successfully

    @ANA-679 @androidApp @iosApp
    Scenario: Cancel logout
        Then I cancel logout of the app

# @ANA-633 @androidApp @iosApp
# Scenario: Rating
#     When I click on "rate_this_app_item" button
#     Then I verify rating page is displayed

# @ANA-660 @androidApp @iosApp
# Scenario: Network issue
#     When I turn off the wifi
#     Then I confirm page has loaded correctly



