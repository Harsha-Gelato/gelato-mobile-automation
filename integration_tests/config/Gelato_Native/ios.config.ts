import config from './wdio.conf';
import PlatformInfo from './platform.info';

// Appium capabilities
config.capabilities = [
    {
        'appium:platformName': 'iOS',
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:maxInstances': 1,
        'appium:automationName': 'Flutter',
        'appium:deviceName': PlatformInfo.deviceName(),
        'appium:platformVersion': PlatformInfo.platformVersion(),
        'appium:app': PlatformInfo.appName(),
        'appium:appWaitDuration': 20000,
        'appium:newCommandTimeout': 90000,
        'appium:webviewConnectTimeout': 20000,
        'appium:launchTimeout': 5000,
        'appium:fullContextList': true,
        'appium:autoAcceptAlerts': true,
        'appium:chromedriverExecutable': '',
        'appium:chromeOptions': {
            'w3c': false,
            'args': [
                '--disable-popup-blocking',
            ],
        },
    },
];

config.cucumberOpts.tagExpression = '@iosApp';// pass tag to run tests specific to ios

exports.config = config;