Feature: Testing Catalog Screens Scenarios.

    @ff005_tc01 @androidApp @iosApp
    Scenario: Layout of Catalog Screen
        Given I launch the app
        When I click on "button_sign_in" button
        Then I navigate to login screen to enter valid login credentials
        Then I navigate to all Intro screens
        Then I click on "catalog_navigation_item" menu button
        Then I confirm title of the page is "Catalog"
        Then I confirm all catalog list items are present
        Then I confirm all bottom navigation options are present

    @ff005_tc02 @androidApp @iosApp
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