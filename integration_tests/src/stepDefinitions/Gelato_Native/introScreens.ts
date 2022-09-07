import { Then } from '@cucumber/cucumber';
import { waitForVisible, switchContextInApp } from '../../pageObjects/common.page';
import allureReporter from '@wdio/allure-reporter';
import * as find from '../../utils/serializer';
import { Logger } from 'tslog';
import dotenv from 'dotenv';

const log: Logger = new Logger();
dotenv.config();
const platformName = process.env.PLATFORM_NAME;

const MAX_INTRO_SCREENS = 3;
const IOS_EXTRA_INTRO_SCREENS = 2;
const TIMEOUT = 5000;

Then(`I navigate to all Intro screens`, async () => {
    allureReporter.addTestId('1xCVv_xZKCyoMi01dkx_rptc9l5AUO6_TIeTf3AJzJ5Q/edit#gid=0&range=6:6');
    for (let i = 0; i < MAX_INTRO_SCREENS; i++) {
        log.debug(`Click on Next button ${i}`);
        await driver.execute('flutter:waitFor', find.byValueKey('next_button'));
        await driver.elementClick(find.byValueKey('next_button'));
        log.debug(`Click on Next successful`);
    }
    if (platformName === 'ios') {
        for (let i = 0; i < IOS_EXTRA_INTRO_SCREENS; i++) {
            log.debug(`Click on continue button ${i}`);
            await driver.pause(TIMEOUT);
            await driver.elementClick(find.byValueKey('continue_button'));
        }
    }
});

Then(`I navigate to default Home screen`, async () => {
    await switchContextInApp('NATIVE_APP');
    await waitForVisible('Your activity');
    log.info(`I navigated to Home Screen`);
});