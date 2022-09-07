/*
* stepDefinition for login.feature file.
*/
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Logger } from 'tslog';
import dotenv from 'dotenv';
import * as find from '../../utils/serializer';
import * as assert from 'assert';
import { clickOnButton, login, switchContextInApp, waitForVisible, loginViaFacebook, loginViaGoogle, openLogoutPopUp } from '../../pageObjects/common.page';
import allureReporter from '@wdio/allure-reporter';
import exceptionConstants from './../../exceptions/exceptionConstants';
import { ElementReference } from '@wdio/protocols';

dotenv.config();
const platformName = process.env.PLATFORM_NAME;
const env = process.env.ENV;

const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');

const emailID = decode(process.env['EMAIL_ID']);
const password = decode(process.env['PASSWORD']);

const facebookEmailID = decode(process.env['FACEBOOK_EMAIL_ID']);
const facebookPassword = decode(process.env['FACEBOOK_PASSWORD']);

const googleEmailID = decode(process.env['GOOGLE_EMAIL_ID']);
const googlePassword = decode(process.env['GOOGLE_PASSWORD']);

const log: Logger = new Logger();

Given('I launch the app', async () => {
    log.info('Initial app testing');
    await driver.switchContext('FLUTTER');
    const contextList = await driver.getContexts();
    log.debug(contextList);

    assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');

    await driver.switchContext('FLUTTER');
    log.info('I have launched the app');
});

When(`I click on {string} button`, async (btn: string) => {
    await driver.pause(2000);
    await driver.switchContext('FLUTTER');
    await driver.execute('flutter: getRenderTree');
    log.info(`Clicking on ${btn} button`);
    await driver.execute('flutter:scrollIntoView', find.byValueKey(btn), { alignment: 0.1 });
    await driver.execute('flutter:waitFor', find.byValueKey(btn));
    await driver.elementClick(find.byValueKey(btn));
    await driver.pause(5000);

});

Then(`I navigate to login screen to enter valid login credentials`, async () => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=2:2');
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
    } else if (platformName === 'ios') {
        await switchContextInApp('WEBVIEW');
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    await driver.pause(3000);
    await login(emailID, password);
    await driver.switchContext('FLUTTER');
});

Then(`I confirm I logged into the application`, async () => {
    await switchContextInApp('NATIVE_APP');
    await waitForVisible('Next');
});

Then(`I navigate to login screen to enter invalid login credentials`, async () => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=3:3');
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
    } else if (platformName === 'ios') {
        await driver.pause(5000);
        await switchContextInApp('WEBVIEW');
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    await driver.pause(3000);
    await login('xxx', 'xxx');
    await driver.switchContext('FLUTTER');
});

Then(`I confirm alert`, async () => {
    let alert: ElementReference;
    const contextNames = await driver.getContexts();
    log.debug(`Context available after alert:{}, ${contextNames}`);
    let alertText = '';
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
        await browser.findElement('xpath', '//*[@id="username"]');
        alert = await browser.findElement('className', 'alert');
        alertText = await browser.getElementText(alert['ELEMENT']);
    } else if (platformName === 'ios' && env === 'browser_stack') {
        await switchContextInApp('WEBVIEW');
        alert = await browser.findElement('xpath', '//*[@label="Invalid username or password."]');
        alertText = await browser.getElementText(alert['ELEMENT']);
    } else if (platformName === 'ios') {
        await switchContextInApp('WEBVIEW');
        await browser.findElement('xpath', '//*[@id="username"]');
        alert = await browser.findElement('xpath', '/html/body/div[2]/div/div/div/div[1]/div');
        alertText = await browser.getElementText(alert['ELEMENT']);
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    expect(alertText).equal('Invalid username or password.');
});



Then('I click on back button on browser to go back on the first screen of app', async () => {
    const backBtn = await browser.findElement('xpath', '//*[@id="login-back-btn"]');
    await driver.elementClick(backBtn['ELEMENT']);
    await switchContextInApp('NATIVE_APP');
    await waitForVisible('Login');
});
Then('I click on X button to go back on the first screen of app', async () => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=4:4');
    allureReporter.addIssue('ANA-516');
    await switchContextInApp('NATIVE_APP');
    if (platformName === 'ios') {
        await waitForVisible('Cancel');
        await clickOnButton('Cancel');
    } else {
        await waitForVisible('Close tab');
        await clickOnButton('Close tab');
    }
    await switchContextInApp('NATIVE_APP');
    await waitForVisible('Login');
});

Then(`I navigate to Facebook screen to enter credentials`, async () => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=5:5');
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
    } else if (platformName === 'ios') {
        await switchContextInApp('WEBVIEW');
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    await driver.pause(3000);
    await loginViaFacebook(facebookEmailID, facebookPassword);
    await driver.switchContext('FLUTTER');
});

Then(`I navigate to Google screen to enter credentials`, async () => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=5:5');
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
    } else if (platformName === 'ios') {
        await switchContextInApp('WEBVIEW');
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    await driver.pause(3000);
    await loginViaGoogle(googleEmailID, googlePassword);
    await driver.switchContext('FLUTTER');
});

Then(`I click on {string} menu button`, async (menuOption: string) => {
    await driver.elementClick(find.byValueKey(menuOption));
});

Then(`I cancel logout of the app`, async () => {
    await openLogoutPopUp();
    await driver.elementClick(find.byValueKey('logout_cancel_button'));
    await driver.execute('flutter:waitFor', find.byValueKey('logout_button'));
});

Then(`I logout from the app`, async () => {
    await openLogoutPopUp();
    await driver.elementClick(find.byValueKey('logout_popup_button'));
    await driver.execute('flutter:waitFor', find.byValueKey('button_sign_in'));
});

Then('I navigated to first page of the app', async () => {
    await driver.execute('flutter:waitFor', find.byValueKey('button_sign_in'));
});
