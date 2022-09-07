import { Then, When } from '@cucumber/cucumber';
import allureReporter from '@wdio/allure-reporter';
import { Logger } from 'tslog';
import { expect } from 'chai';
import ADBHelper from './../../utils/adbHelper';
import * as find from '../../utils/serializer';
import {
    clickOnButton,
    findElementWithXPath,
    switchContextInApp,
    waitForVisible,
    getElementWithXPath,
} from '../../pageObjects/common.page';
import exceptionConstants from './../../exceptions/exceptionConstants';
import { linksMap, languageMap, linksHeadingMap, notificationOptions } from './../../utils/array';
import assert from 'assert';

const platformName = process.env.PLATFORM_NAME;
const env = process.env.ENV;
const log: Logger = new Logger();
const ALL_DATA_OFF = 0;
const ALL_DATA_ON = 6;
const TIMEOUT = 2000;
const INTERVAL_TIME = 10;

Then(`I verify link of {string} is working successfully`, async (option: string) => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=244:244');
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
    } else if (platformName === 'ios') {
        await switchContextInApp('WEBVIEW');
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    if (env === 'browser_stack') {
        await browser.findElement('xpath', `//*[contains(@label, '${linksHeadingMap[option]}')]`);
    } else {
        await driver.pause(TIMEOUT);
        const url = await browser.getUrl();
        expect(url).equal(linksMap[option]);
    }

    log.info('Moving back to the More Screen');
    await switchContextInApp('NATIVE_APP');
    await driver.pause(TIMEOUT);
    if(option !== 'support_item'){
        if (platformName === 'android') {
            await driver.pressKeyCode(4);
        } else if (platformName === 'ios') {
            await waitForVisible('Done');
            await clickOnButton('Done');
        } else {
            throw new Error(exceptionConstants['invalidPlatform']);
        }
    }else{
        await driver.switchContext('FLUTTER');
        await driver.elementClick(find.byValueKey('appbar_back_button'));
    }
    await driver.switchContext('FLUTTER');
});

Then(`I verify rating page is displayed`, async () => {
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
        await driver.pause(TIMEOUT);
        const url = await browser.getUrl();
        expect(url).equal(linksMap['google_play_link']);
        await switchContextInApp('NATIVE_APP');
        await driver.pressKeyCode(4);
        await driver.switchContext('FLUTTER');
    } else if (platformName === 'ios') {
        await switchContextInApp('NATIVE_APP');
        await driver.touchPerform([
            {
                action: 'tap',
                options: {
                    x: 60,
                    y: 499,
                },
            },
            {
                action: 'wait',
                options: {
                    ms: 100,
                },
            },
        ]);
        await driver.pause(TIMEOUT);
        await driver.switchContext('FLUTTER');
        await driver.pause(TIMEOUT);
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
});
Then(`I verify feedback can be submitted successfully`, async () => {
    await switchContextInApp('NATIVE_APP');
    if (platformName === 'ios') {
        await driver.pause(TIMEOUT);
        const button = await driver.findElement('xpath', `//*[contains(@name, 'Send')]`);
        await driver.elementClick(button['ELEMENT']);
    } else {
        await waitForVisible('Send');
        const button = await driver.findElement('accessibility id', 'Send');
        const ELEMENT = 'ELEMENT';
        await driver.elementClick(button[ELEMENT]);
    }
    await waitForVisible('Your feedback has been sent successfully!');
    await driver.switchContext('FLUTTER');
});

When(`I turn off the wifi`, async () => {
    if (platformName === 'android') {
        await driver.switchContext('NATIVE_APP');
        const getNetworkConnection = await driver.getNetworkConnection();
        log.info(`Before ${getNetworkConnection}`);
        await driver.setNetworkConnection(ALL_DATA_OFF);
        await driver.switchContext('FLUTTER');
        await driver.pause(TIMEOUT);
        await driver.execute('flutter:waitFor', find.byValueKey('retry_button'));
        await driver.elementClick(find.byValueKey('retry_button'));
        await driver.switchContext('NATIVE_APP');
        await driver.setNetworkConnection(ALL_DATA_ON);
        await driver.pause(TIMEOUT);
    } else if (platformName === 'ios') {
        await driver.switchContext('NATIVE_APP');
        ADBHelper.executeShellCommand('networksetup', '-setnetworkserviceenabled Wi-Fi off'.split(' '));
        await driver.switchContext('FLUTTER');
        await driver.execute('flutter:waitFor', find.byValueKey('retry_button'));
        await driver.elementClick(find.byValueKey('retry_button'));
        await driver.switchContext('NATIVE_APP');
        ADBHelper.executeShellCommand('networksetup', '-setnetworkserviceenabled Wi-Fi on'.split(' '));
        await driver.background(INTERVAL_TIME);
        await driver.terminateApp('com.gelato.api.stage');
        await driver.activateApp('com.gelato.api.stage');
        await driver.pause(TIMEOUT);
    } else {
        throw new Error('Platform is not defined to switch context');
    }
});

Then(`I confirm page has loaded correctly`, async () => {
    await switchContextInApp('NATIVE_APP');
    await findElementWithXPath(`//*[contains(@content-desc,'More')]`, `//*[contains(@name, 'More')]`);
});

Then(`I verify {string} is default selected option`, async (defaultOption: string) => {
    await driver.elementClick(find.byValueKey(defaultOption));
    await driver.execute('flutter:waitFor', find.byValueKey(defaultOption));
});

Then(`I go back to previous screen`, async () => {
    await driver.elementClick(find.byValueKey('appbar_back_button'));
});

Then(`I select each language to verify its title`, async () => {
    for (const language of Object.keys(languageMap)) {
        const title = languageMap[language];
        await driver.elementClick(find.byValueKey(language));

        await driver.switchContext('NATIVE_APP');
        let button = {};
        button = await getElementWithXPath(`//*[@content-desc="${title}"]`, `//*[@name="${title}"]`);
        // tslint:disable-next-line: no-unused-expression
        expect(button).to.not.be.null;
        await driver.switchContext('FLUTTER');
    }
});

Then(`I change currency to {string}`, async (currency: string) => {
    await driver.elementClick(find.byValueKey(currency));
});

Then(`I scroll down the page from {string}`, async (id: string) => {
    await driver.execute('flutter:scroll', find.byValueKey(id), { dx: 50, dy: -400, durationMilliseconds: 200, frequency: 30 });
});

Then(`I scroll up the page from {string}`, async (id: string) => {
    await driver.execute('flutter:scroll', find.byValueKey(id), { dx: 50, dy: 700, durationMilliseconds: 200, frequency: 30 });
});

Then(`I confirm currency of price is displayed in {string}`, async (expectedCurrency) => {
    await driver.elementClick(find.byValueKey('catalog_category_#0'));
    await driver.elementClick(find.byValueKey('catalog_category_#0'));
    await driver.execute('flutter:waitFor', find.byValueKey('catalog_product_#0'));
    const catalogPrice = find.descendant({
        of: find.byValueKey('catalog_product_#0'),
        matching: find.byValueKey('catalog_product_card_price'),
    });
    const price = await driver.getElementText(catalogPrice);
    const currency = price.split(' ')[0];
    assert.strictEqual(currency, expectedCurrency);
});

Then(`I click on each notification to confirm its status`, async () => {
    for (const notification of notificationOptions) {
        await driver.execute('flutter:waitFor', find.byValueKey(notification + '_enabled'));
        await driver.elementClick(find.byValueKey(notification + '_enabled'));
        await driver.execute('flutter:waitFor', find.byValueKey(notification + '_disabled'));
        await driver.elementClick(find.byValueKey(notification + '_disabled'));
        await driver.execute('flutter:waitFor', find.byValueKey(notification + '_enabled'));
    }
});