class PlatformInfo {
    static platformName = process.env.PLATFORM_NAME;

    // pass the udid or devicename
    static deviceName() {
        let deviceName = '';
        switch (this.platformName) {
            case 'android':
                deviceName = 'Google Pixel 5';
                break;
            case 'ios':
                deviceName = 'iPhone 13';
                break;
            default:
                throw new Error('No device found');
        }
        return deviceName;
    }

    // pass the platform version
    static platformVersion() {
        let platformVersion = '';
        switch (this.platformName) {
            case 'android':
                platformVersion = '12.0';
                break;
            case 'ios':
                platformVersion = '15.4';
                break;
            default:
                throw new Error('No platform version found');
        }
        return platformVersion;
    }

    static appName() {
        let appPath = '';
        switch (this.platformName) {
            case 'android':
                appPath = '../../gelato-api-mobile/build/app/outputs/flutter-apk/app-stage-release.apk';
                break;
            case 'ios':
                /* Local Build Path. UnComment below appPath to run IOS test locally and comment the CodeMagic VM Build Path
                // appPath = '../build/ios/iphonesimulator/Runner.app';
                */
                //CodeMagic VM Build Path
                appPath = '../../gelato-api-mobile/build/ios/iphonesimulator/Runner.app';
                // appPath = '/Users/builder/Library/Developer/Xcode/DerivedData/Runner-edaimyiflreloheqntgnhkmwcclv/Build/Products/Debug-iphonesimulator/Runner.app';
                break;
            default:
                throw new Error('No appPath found');
        }
        return appPath;
    }
}
export default PlatformInfo;
