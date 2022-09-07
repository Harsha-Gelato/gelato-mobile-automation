import config from './wdio.conf';
import PlatformInfo from './platform.info';

// Appium capabilities
config.capabilities = [{
    'appium:platformName': 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:automationName': 'Flutter',
    'appium:app': PlatformInfo.appName(),
    'appium:noReset': false, // on Android will keep your app cache saved and with new Appium session there will be no need to log in again.
    'appium:fullReset': false,
    'appium:maxInstances': 1,
    'appium:platformVersion': '',
    'appium:appWaitDuration': 20000,
    'appium:newCommandTimeout': 12000,
    'appium:webviewConnectTimeout': 20000,
    'appium:launchTimeout': 5000,
    'appium:fullContextList': false,
    'appium:autoAcceptAlerts': true,
    'appium:chromedriverExecutable': './node_modules/chromedriver/lib/chromedriver/chromedriver',
    'appium:chromeOptions': {
        'w3c': false,
        'args': [
            '--no-sandbox',
        ],
    },
}];

config.cucumberOpts.tagExpression = '@androidApp'; // pass tag to run tests specific to android

exports.config = config;