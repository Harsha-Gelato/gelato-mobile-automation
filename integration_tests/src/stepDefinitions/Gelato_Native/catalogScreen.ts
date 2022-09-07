/*
* stepDefinition for catalogScreen.feature file.
*/
import { Then } from '@cucumber/cucumber';
import { assert, expect } from 'chai';
import { Logger } from 'tslog';
import * as find from '../../utils/serializer';
import dotenv from 'dotenv';
import {
    getElementWithXPath,
    scroll,
    verifyTitleOfSubCatalog,
    clickOnBackButton,
} from '../../pageObjects/common.page';
import allureReporter from '@wdio/allure-reporter';
import exceptionConstants from '../../exceptions/exceptionConstants';
import { catalogMap, menuOptions, TShirtcatalogMap } from '../../utils/array';

dotenv.config();
let startingXPosition = 250;
let startingYPosition = 650;
let moveToXPosition = 10;
let moveToYPosition = 100;

const platformName = process.env.PLATFORM_NAME;
const log: Logger = new Logger();
const TIMEOUT = 5000;

Then(`I confirm title of the page is {string}`, async (title: string) => {
    await driver.execute('flutter:waitFor', find.byText(title));
});

Then(`I confirm all catalog list items are present`, async () => {
    await driver.switchContext('FLUTTER');
    for (let index = 0; index < 12; index++) {
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_category_#${index}`), { alignment: 0.1 });
        await driver.execute('flutter:waitFor', find.byValueKey(`catalog_category_#${index}`));
    }
});

Then(`I confirm all bottom navigation options are present`, async () => {
    for (const menuOption of menuOptions) {
        await driver.execute('flutter:waitFor', find.byValueKey(menuOption));
        await driver.elementClick(find.byValueKey(menuOption));
    }
});

Then(`I confirm {string} is {string} catalog item is visible`, async (catalogKey: string, position: string) => {
    let title = '';
    if (position === 'first' && catalogKey === 'Men\'s clothing') {
        log.info('Searching for first catalog item');
        const catalogTitle = find.descendant({
            of: find.byValueKey(`catalog_category_#0`),
            matching: find.byValueKey('catalog_title'),
        });
        title = await driver.getElementText(catalogTitle);
        assert.strictEqual(title, catalogKey);
    } else if (position === 'last' && catalogKey === 'Tote Bags') {
        log.info('Searching for last catalog item');
        const catalogTitle = find.descendant({
            of: find.byValueKey(`catalog_category_#11`),
            matching: find.byValueKey('catalog_title'),
        });
        title = await driver.getElementText(catalogTitle);
        assert.strictEqual(title, catalogKey);
    } else {
        throw new Error(exceptionConstants['invalidPosition']);
    }
});

Then(`I scroll down`, async () => {
    moveToYPosition = 1500;
    log.info('Performing scrolling to go on top');
    await scroll(startingXPosition, startingYPosition, moveToXPosition, moveToYPosition);
    await driver.pause(TIMEOUT);
});

Then(`I click and navigate to {string} catalog`, async (catalogOption: string) => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=96:96');
    const catalogName = catalogMap[catalogOption][0];
    const button = await getElementWithXPath(`//*[@content-desc="${catalogName}"]`,
        `//*[@label="${catalogName}"]`);
    await driver.elementClick(button['ELEMENT']);
    await driver.pause(TIMEOUT);
});

Then(`I confirm the sub catalogs on {string} catalog page`, async (catalogOption: string) => {
    let totalItmes = 0;
    switch (catalogOption) {
        case 'men':
        case 'women':
            totalItmes = 8;
            break;
        case 'kids':
        case 'phone_cases':
            totalItmes = 5;
            break;
        case 'wall_art':
        case 'mugs':
        case 'stationery':
            totalItmes = 9;
            break;
        case 'wallpaper':
            totalItmes = 1;
            break;
        case 'photo_books':
        case 'cards':
        case 'calendars':
        case 'tote_bags':
            totalItmes = 2;
            break;
        case 'wallpaper':
            totalItmes = 1;
            break;
        default:
            log.error('Wrong selection');
    }
    for (let index = 0; index < totalItmes; index++) {
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_category_#${index}`), { alignment: 0.1 });
        await driver.execute('flutter:waitFor', find.byValueKey(`catalog_category_#${index}`));
    }
});

Then(`I click and navigate to {string} sub catalog`, async (subCatalogOption: string) => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=96:96');
    const button = await getElementWithXPath(`//*[@content-desc="${subCatalogOption}"]`, `//*[@name="${subCatalogOption}"]`);
    await driver.elementClick(button['ELEMENT']);

});

Then(`I verify {string} product catalog list appears and the item count is {int}`, async (product: string, count: number) => {
    for (let index = 0; index < count; index++) {
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_product_#${index}`), { alignment: 0.1 });
        await driver.execute('flutter:waitFor', find.byValueKey(`catalog_product_#${index}`));
    }
});

Then(`I verify price of each sub catalog of T-shirts is displayed correctly`, async () => {
    let index = 0;
    for (const catalogItem of TShirtcatalogMap) {
        log.info(`Navigating to ${catalogItem} ${`catalog_product_#${index}`}`);
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_product_#${index}`), { alignment: 0.1 });
        await driver.execute('flutter:waitFor', find.byValueKey(`catalog_product_#${index}`));
        const catalogPrice = find.descendant({
            of: find.byValueKey(`catalog_product_#${index}`),
            matching: find.byValueKey('catalog_product_card_price'),
        });
        const price = await driver.getElementText(catalogPrice);
        const regex = /^[¢£$kc¥€]{1}\d{1,}(\.\d{1,3})?$/ig;
        const results = regex.test(price);
        expect(results).to.be.true;
        index++;
    }
});

Then(`I confirm all title are correctly displayed after clicking on each item of T-shirt sub-catalog list`, async () => {
    startingXPosition = 537;
    startingYPosition = 537;
    moveToXPosition = 459;
    moveToYPosition = 240;
    let button = {};

    if (platformName === 'ios') {
        for (let i = TShirtcatalogMap.length - 1; i >= 0; i--) {
            if (i < 5) {
                await scroll(12, 103, 12, 483);
            }
            await driver.pause(TIMEOUT);
            button = await getElementWithXPath(`//*[contains(@content-desc,'${TShirtcatalogMap[i]}')]`, `//*[contains(@label, '${TShirtcatalogMap[i]}')]`);
            await driver.elementClick(button['ELEMENT']);
            log.info('Confirming title of the catalog');
            await verifyTitleOfSubCatalog(TShirtcatalogMap[i]);
            await clickOnBackButton(0, 51);
        }
    } else if (platformName === 'android') {
        log.info('Scrolling to the default position');
        await scroll(459, 254, 537, 537);
        for (const catalogItem of TShirtcatalogMap) {
            button = await getElementWithXPath(`//*[contains(@content-desc,'${catalogItem}')]`, `//*[contains(@label, '${catalogItem}')]`);
            // Checking if catalog item exist on screen
            if (button['ELEMENT']) {
                log.info('Element is visible');
            } else {
                log.error('Element is not visible. So, scrolling up on screen');
                await scroll(startingXPosition, startingYPosition, moveToXPosition, moveToYPosition);
                button = await getElementWithXPath(`//*[contains(@content-desc,'${catalogItem}')]`, `//*[contains(@label, '${catalogItem}')]`);
            }
            await driver.elementClick(button['ELEMENT']);
            log.info('Confirming title of the catalog');
            await verifyTitleOfSubCatalog(catalogItem);
            await driver.back();
        }
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
});

Then(`I verify size, fullfillment summary, color section, artwork preview, shipping cost of each sub catalog of T-shirts is displayed correctly`, async () => {
    let index = 0;
    for (const catalogItem of TShirtcatalogMap) {
        log.info(`Navigating to ${catalogItem} ${`catalog_product_#${index}`}`);
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_product_#${index}`), { alignment: 0.1 });
        await driver.elementClick(find.byValueKey(`catalog_product_#${index}`));
        // fulfillemnt summary
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_product_fulfillment_summary`), { alignment: 0.1 });
        const fullfilmentSummary = await driver.getElementText(find.byValueKey(`catalog_product_fulfillment_summary`));
        log.info(`Fullfilment Summary of ${catalogItem} is: ${fullfilmentSummary}`);
        // Color section
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_filter_GarmentColor_title`), { alignment: 0.1 });
        // Size section
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`catalog_filter_GarmentSize_title`), { alignment: 0.1 });

        // Artwork Preview section
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`artwork_preview_image`), { alignment: 0.1 });
        await driver.elementClick(find.byValueKey('artwork_preview_image'));
        await driver.elementClick(find.byText('Close'));

        // Shipping country selected filter with shipping cost
        await driver.execute('flutter:scrollIntoView', find.byValueKey(`shipping_cost_country_option_UA_selected`), { alignment: 0.1 });
        const text = await driver.getElementText(find.byValueKey(`shipping_cost_country_option_UA_selected`));
        log.info(`Selected country is ${catalogItem} is: ${text}`);
        await driver.elementClick(find.byValueKey('shipping_cost_country_option_UA_selected'));
        await driver.execute('flutter:waitForAbsent', find.byValueKey('catalog_shipping_price'));
        await driver.elementClick(find.byValueKey('shipping_cost_country_option_GB'));
        await driver.execute('flutter:waitFor', find.byValueKey('catalog_shipping_price'));
        await driver.execute('flutter:scroll', find.byValueKey(`shipping_cost_country_option_GB_selected`), { dx: 50, dy: 2000, durationMilliseconds: 200, frequency: 30 });
        // Min delivery days
        await driver.execute('flutter:waitFor', find.byValueKey('catalog_product_min_delivery_days'));

        await driver.execute('flutter:waitFor', find.byValueKey('appbar_back_button'));
        await driver.elementClick(find.byValueKey('appbar_back_button'));
        index++;
    }
});