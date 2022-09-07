import config from './browserStackWdio.conf';
import PlatformInfo from './platform.info';

// Appium capabilities
config.capabilities = [{
    platformName: 'Android',
    noReset: false, // on Android will keep your app cache saved and with new Appium session there will be nto log in again.
    fullReset: false,
    maxInstances: 1,
    automationName: 'flutter',
    project: 'Gelato API Native Project',
    build: 'Android_Staging',
    name: 'Gelato API Native Testing',
    debug: 'true',
    networkLogs: 'true',
    deviceName: PlatformInfo.deviceName(),
    platformVersion: PlatformInfo.platformVersion(),
    app: 'GelatoApp',
    appWaitDuration: 20000,
    newCommandTimeout: 12000,
    webviewConnectTimeout: 20000,
    launchTimeout: 5000,
    fullContextList: false,
    autoAcceptAlerts: true,
    chromedriverExecutable: './node_modules/chromedriver/lib/chromedriver/chromedriver',
    chromeOptions: {
        'w3c': false,
        'args': [
            '--no-sandbox',
        ],
    },
}];

config.cucumberOpts.tagExpression = '@androidApp'; // pass tag to run tests specific to android

exports.config = config;
