import config from './browserStackWdio.conf';
import PlatformInfo from './platform.info';

// Appium capabilities
config.capabilities = [
    {
        platformName: 'iOS',
        noReset: false,
        fullReset: true,
        maxInstances: 1,
        automationName: 'flutter',
        deviceName: PlatformInfo.deviceName(),
        platformVersion: PlatformInfo.platformVersion(),
        project: 'Gelato API Native Project',
        build: 'IOS_Staging',
        name: 'Gelato API Native Testing',
        debug: 'true',
        networkLogs: 'true',
        app: 'GelatoApp',
        appWaitDuration: 20000,
        newCommandTimeout: 90000,
        webviewConnectTimeout: 20000,
        launchTimeout: 5000,
        fullContextList: true,
        autoAcceptAlerts: true,
        chromedriverExecutable: '',
        // 'browserstack.resignApp': 'false', // enterprise signed version. // list of entitlements that app requires on ios
        chromeOptions: {
            'w3c': false,
            'args': [
                '--disable-popup-blocking',
            ],
        },
    },
];

config.cucumberOpts.tagExpression = '@iosApp';// pass tag to run tests specific to ios

exports.config = config;
