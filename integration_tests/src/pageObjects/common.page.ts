import { expect } from 'chai';
import { Logger } from 'tslog';
import * as find from '../utils/serializer';
import exceptionConstants from '../exceptions/exceptionConstants';
import { ElementReference } from '@wdio/protocols';

const platformName = process.env.PLATFORM_NAME;
const env = process.env.ENV;
const log: Logger = new Logger();
const TIMEOUT = 10000;

export async function clickOnButton(text: string) {
    await waitForVisible(text);
    const button = await driver.findElement('accessibility id', text);
    const ELEMENT = 'ELEMENT';
    await driver.elementClick(button[ELEMENT]);
    // This is needed as switch context is taking place i.e from NATIVE VIEW to WEBVIEW
    await driver.pause(5000);
}

export async function enterUsername(emailID: string) {
    let emailField: ElementReference;
    if (platformName === 'ios' && env === 'browser_stack') {
        emailField = await browser.findElement('xpath', '//*[@value="E-mail"]');
        await browser.elementClick(emailField['ELEMENT']);
    } else {
        emailField = await browser.findElement('xpath', '//*[@id="username"]');
    }
    await browser.elementClear(emailField['ELEMENT']);
    await browser.elementSendKeys(emailField['ELEMENT'], emailID);
}

export async function enterPassword(password: string) {
    let passField: ElementReference;
    if (platformName === 'ios' && env === 'browser_stack') {
        passField = await browser.findElement('xpath', '//*[@value="Password"]');
        await browser.elementClick(passField['ELEMENT']);
    } else {
        passField = await browser.findElement('xpath', '//*[@id="password"]');
    }
    await browser.elementClear(passField['ELEMENT']);
    await browser.elementSendKeys(passField['ELEMENT'], password);
}

export async function login(emailID: string, password: string): Promise<void> {
    let loginBtn: ElementReference;
    if (platformName === 'android') {
        await switchContextInApp('WEBVIEW_chrome');
    } else if (platformName === 'ios') {
        await switchContextInApp('WEBVIEW');
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    await enterUsername(emailID);
    await enterPassword(password);
    if (platformName === 'ios' && env === 'browser_stack') {
        loginBtn = await browser.findElement('xpath', '//*[@label="Log in"]');
    } else {
        loginBtn = await browser.findElement('xpath', '//*[@id="kc-login"]');
        await driver.pause(5000);
    }
    await driver.elementClick(loginBtn['ELEMENT']);
}

export async function loginViaFacebook(emailID: string, password: string): Promise<void> {
    let emailField: ElementReference;
    let passField: ElementReference;
    let loginBtn: ElementReference;
    if (platformName === 'ios' && env === 'browser_stack') {
        emailField = await browser.findElement('xpath', `//*[contains(@value, 'email')]`);
        await browser.elementClick(emailField['ELEMENT']);
        await browser.elementSendKeys(emailField['ELEMENT'], emailID);
        passField = await browser.findElement('xpath', `//*[contains(@value, 'Facebook Password')]`);
        await browser.elementClick(passField['ELEMENT']);
        await browser.elementSendKeys(passField['ELEMENT'], password);
        loginBtn = await browser.findElement('xpath', '//*[@label="Log in"]');
        await driver.elementClick(loginBtn['ELEMENT']);
    } else if (platformName === 'android' && env === 'browser_stack') {
        emailField = await browser.findElement('xpath', '//*[@id="m_login_email"]');
        await browser.elementSendKeys(emailField['ELEMENT'], emailID);
        passField = await browser.findElement('xpath', '//*[@id="m_login_password"]');
        await browser.elementSendKeys(passField['ELEMENT'], password);
        loginBtn = await browser.findElement('css selector', "[name*='login']");
        await driver.elementClick(loginBtn['ELEMENT']);
    } else {
        try {
            const cookie = await browser.findElement('css selector', "[title*='Only allow essential cookies']");
            await driver.elementClick(cookie['ELEMENT']);
        } catch (err) {
            log.info(`Cookie Screen not found ${err}. Moving to next screen`);
        }
        emailField = await browser.findElement('xpath', '//*[@id="m_login_email"]');
        await browser.elementSendKeys(emailField['ELEMENT'], emailID);
        passField = await browser.findElement('xpath', '//*[@id="m_login_password"]');
        await browser.elementSendKeys(passField['ELEMENT'], password);
        loginBtn = await browser.findElement('css selector', "[name*='login']");
        await driver.elementClick(loginBtn['ELEMENT']);
    }
}

export async function loginViaGoogle(emailID: string, password: string): Promise<void> {
    let emailField: ElementReference;
    let nextBtn1: ElementReference;
    let doneBtn1: ElementReference;
    let nextBtn2: ElementReference;
    let doneBtn2: ElementReference;
    let passField: ElementReference;
    if (platformName === 'ios' && env === 'browser_stack') {
        emailField = await browser.findElement('xpath', '//*[@label="Email or phone"]');
        await browser.elementClick(emailField['ELEMENT']);
        await browser.elementClear(emailField['ELEMENT']);
        await browser.elementSendKeys(emailField['ELEMENT'], emailID);
        doneBtn1 = await browser.findElement('xpath', '//*[@label="Done"]');
        await driver.elementClick(doneBtn1['ELEMENT']);
        nextBtn1 = await browser.findElement('xpath', '//*[@label="Next"]');
        await browser.elementClick(nextBtn1['ELEMENT']);
        await driver.pause(5000);
        passField = await browser.findElement('xpath', '//*[@label="Enter your password"]');
        await browser.elementClick(passField['ELEMENT']);
        await browser.elementClear(passField['ELEMENT']);
        await browser.elementSendKeys(passField['ELEMENT'], password);
        doneBtn2 = await browser.findElement('xpath', '//*[@label="Done"]');
        await driver.elementClick(doneBtn2['ELEMENT']);
        nextBtn2 = await browser.findElement('xpath', '//*[@label="Next"]');
        await browser.elementClick(nextBtn2['ELEMENT']);
    } else {
        emailField = await browser.findElement('xpath', '//*[@id="identifierId"]');
        await browser.elementClear(emailField['ELEMENT']);
        await browser.elementSendKeys(emailField['ELEMENT'], emailID);
        nextBtn1 = await browser.findElement('xpath', '//*[@id="identifierNext"]/div/button/span');
        await driver.elementClick(nextBtn1['ELEMENT']);
        await browser.setImplicitTimeout(TIMEOUT);
        passField = await browser.findElement('xpath', '//*[@id="password"]/div[1]/div/div[1]/input');
        await driver.pause(5000);
        await browser.elementClear(passField['ELEMENT']);
        await browser.elementSendKeys(passField['ELEMENT'], password);
        nextBtn2 = await browser.findElement('xpath', '//*[@id="passwordNext"]/div/button/span');
        await driver.pause(5000);
        await driver.elementClick(nextBtn2['ELEMENT']);
        await browser.setImplicitTimeout(TIMEOUT);
    }
}

export async function switchContextInApp(webdriver: string) {
    if (platformName === 'android') {
        const contextNames = await driver.getContexts();
        log.debug(`Context available:{}, ${contextNames}`);
        if (webdriver === 'NATIVE_APP') {
            log.debug(`Switching to ${contextNames[0]}`);
            await driver.switchContext(contextNames[0]);
            log.info(`Switched to ${contextNames[0]}`);
        } else if (webdriver === 'WEBVIEW_chrome') {
            log.debug(`Switching to ${contextNames[contextNames.length - 2]}`);
            await driver.switchContext(contextNames[contextNames.length - 2]);
            log.info(`Switched to ${contextNames[contextNames.length - 2]}`);
        } else {
            log.info(`Invalid webdriver selected in Android`);
        }
    } else if (platformName === 'ios') {
        const contextNames = await driver.getContexts();
        log.debug(`Context available: ${JSON.stringify(contextNames)}`);
        if (webdriver === 'NATIVE_APP') {
            log.debug(`Switching to ${contextNames[0]}`);
            const appiumWebview = contextNames
                .filter(c => c['id'] === 'NATIVE_APP')[0];
            await driver.switchContext(appiumWebview['id']);
        } else if (webdriver === 'WEBVIEW') {
            log.debug(`Switching to WEBVIEW`);
            const appiumWebview = contextNames
                .filter(c => c['id'] !== 'NATIVE_APP')
            [0];
            await driver.pause(5000);
            log.debug(`appiumWebview: ${JSON.stringify(appiumWebview)}`);
            await driver.switchContext(appiumWebview['id']);
            log.debug(`Switched to ${appiumWebview['id']}`);
        } else {
            log.info(`Invalid webdriver selected in IOS`);
        }
    } else {
        throw new Error('Platform is not defined to switch context');
    }
}

export async function waitForVisible(accessibilityID: string) {
    const button = await driver.findElement('accessibility id', accessibilityID);
    // tslint:disable-next-line: no-unused-expression
    expect(button).to.not.be.null;
}

export async function scroll(startXPosition: number, startYPosition: number, moveToXPosition: number, moveToYPosition: number) {
    await driver.touchPerform([
        {
            action: 'press',
            options: {
                x: startXPosition,
                y: startYPosition,
            },
        },
        {
            action: 'wait',
            options: {
                ms: 100,
            },
        },
        {
            action: 'moveTo',
            options: {
                x: moveToXPosition,
                y: moveToYPosition,
            },
        },
        {
            action: 'release',
            options: {},
        },
    ]);
}

export async function findElementWithXPath(xPathforAndroidElem: string, xPathforIOSElem: string) {
    if (platformName === 'android') {
        await driver.findElement('xpath', xPathforAndroidElem);
    } else if (platformName === 'ios') {
        await driver.findElement('xpath', xPathforIOSElem);
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
}

export async function getElementWithXPath(xPathforAndroidElem: string, xPathforIOSElem: string) {
    let button = {};
    if (platformName === 'android') {
        button = await driver.findElement('xpath', xPathforAndroidElem);
    } else if (platformName === 'ios') {
        button = await driver.findElement('xpath', xPathforIOSElem);
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    return button;
}

export async function getElementWithAttribute(elemID: string, androidAttributeName: string, iosAttributeName: string) {
    let str = '';
    if (platformName === 'android') {
        str = await driver.getElementAttribute(elemID, androidAttributeName);
    } else if (platformName === 'ios') {
        str = await driver.getElementAttribute(elemID, iosAttributeName);
    } else {
        throw new Error(exceptionConstants['invalidPlatform']);
    }
    return str;
}

export async function verifyTitleOfSubCatalog(catalogItem: string) {
    await findElementWithXPath(`//*[contains(@content-desc,'${catalogItem}')]`, `//*[contains(@label, '${catalogItem}')]`);
    log.info(`Title of the sub catalog {catalogItem} is correct`);
}

export async function clickOnBackButton(xCordinate: number, yCordinate: number) {
    await driver.touchPerform([
        {
            action: 'press',
            options: {
                x: xCordinate,
                y: yCordinate,
            },
        },
        {
            action: 'wait',
            options: {
                ms: 100,
            },
        },
        {
            action: 'release',
            options: {},
        },
    ]);
}

export async function openLogoutPopUp(): Promise<void> {
    const startingXPosition = 16;
    const startingYPosition = 672;
    const moveToXPosition = 16;
    const moveToYPosition = 191;
    await driver.switchContext('NATIVE_APP');
    if (platformName === 'android') {
        await driver.pause(5000);
    }
    await scroll(startingXPosition, startingYPosition, moveToXPosition, moveToYPosition);

    await driver.switchContext('FLUTTER');
    await driver.pause(5000);
    await driver.elementClick(find.byValueKey('logout_button'));
}