## Setting up a local environment 
### MacOS

### Framwork details of this automation project
* Framework - [WedDriverIO](https://webdriver.io/), BDD
* Testing tool - Cucumber [ Reason: It enhances communication among the members of a cross-functional product team + or Manual Tester uses Gherkin syntax for creating testCases so it will be easy to map and check what all testCases are automated using feature tags ]
* Scripting language - Gherkin, TypeScript/JavaScript
* Assertion Library: Chai
* Automation tool - Appium
* Reporting - Report builder
* CI/CD tool - Codemagic

## Setup to start automation:
* Download and install `Android Studio` from the [official site](https://developer.android.com/studio) 

* Add path to Android SDK into `.profile` file, for example (.bashrc, .zshrc etc)
	```bash
	export ANDROID_SDK_ROOT=/Users/#{username}/Library/Android/sdk
	export PATH=$PATH:$ANDROID_SDK_ROOT/
	export PATH=$PATH:$ANDROID_SDK_ROOT/bundle-tool
	export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
	export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
	export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
	export ANDROID_HOME=$ANDROID_SDK_ROOT
	export GRADLE_HOME=/Users/#{username}/gradle
   ```
* [Create Keystore]((https://docs.flutter.dev/deployment/android#reference-the-keystore-from-the-app)) to be able to upload build application to the simulator. Perform the following command in Java's home directory.
	```bash
	#To find the Java's home dir perform the following command
	/usr/libexec/java_home
* Create env file and ask any developer to provide contents of .env file to you. Just copy paste the contents of those contents in your .env file
* Copy generated file to `#{gelato-api-mobile repo}/android` directory.
* To check API level corresponding to Android version refer:
  https://en.wikipedia.org/wiki/Android_version_history
  This API information will be used to create android emulator.
  
* Accept all Android SDK licenses, navigate to `~/Library/Android/sdk/tools/bin/` directory and perform the following command
	```bash
	./sdkmanager --licenses
	```
* Create `gradle.properties` default config file in ` ~/.gradle/`  directory. Here's files contents
	```
	# Set Java machine heap size
	org.gradle.jvmargs=-Xmx4096m
	```
* Run some android emulator in the Android studio.

## Build Android apk
* To build and deploy **stage** run :
  ```
   `flutter build apk --flavor stage -t lib/main_stage.dart`
  ```
* To build and deploy **prod** run: 
  ```
  `flutter build apk --flavor prod -t lib/main_prod.dart`
  ```
**Note:** If you face error run 
    ```

    `flutter pub run build_runner build --delete-conflicting-outputs`

    before running above commands to build stage/prod apk builds successfully.
* Eg. of **Build artifact path** in your repo:  `#{gelato-api-mobile repo}/build/app/outputs/flutter-apk/app-stage-release.apk`
  If you face any issue check [sdk version](https://reactnative.dev/docs/environment-setup)

## Start automation Locally for Android
* Inside your repo run: 
  ```
  `cd integration-test`
  ```
* Run `npm run install-dep` to install all dependencies from package.json
* Make sure you have [appium](https://appium.io/docs/en/drivers/mac/) and appium inspector install in your system
* Create .env file in inside **integration-test** folder
  ```
  EMAIL_ID="<TESTING ACCOUNT EMAIL ID>"
  PASSWORD="<TESTING ACCOUNT PASSWORD>"
  ```
  To encode your emailID and password, Eg:
  ```
  echo -n <EMAILID> | base64      // To encode your emailid
  echo -n <OUTPUT_OF_ENCODE> | base64 -D  // To decode your emailid
  ```
  Like this you can use any emailID and password of any account.

* To run test locally run: 
  ```
  `npm run android`
  ```

## Build IOS .ipa
* Make sure you have all access as developer to Gelato API team in [App Store Connect](https://developer.apple.com/). Raise IT ticket for the same.
* To check if all the access are provided to you correctly navigate to https://developer.apple.com/account/resources/certificates/list and check if you have rights to visit this page.
* Download [Xcode](https://developer.apple.com/xcode/)
* Open simulator through Xcode > Open Developer Tools > Simulator:
* To get udid of current simulator run: 
  ```
  `xcrun simctl list | grep '(Booted)'`
  ```
* Open IOS project in Xcode by clicking on `#{gelato-api-mobile repo}/ios/Runner.xcodeproj`
* Add **User Defined Settings** in **Build Settings**. Contact any developer for the same.
* Click on play button on Xcode to start the build.
* On Vscode, to build and deploy **stage** run :
  ``` 
  `flutter build ipa --flavor stage -t lib/main_stage.dart` 
  ```
  Or
  ```
  `flutter run --flavor stage -d "iPhone 13" lib/main.dart`
  ```

* On Vscode, to build and deploy **prod** run: 
  ```
  `flutter build ipa --flavor prod -t lib/main_prod.dart`
  ```
**Note:** If you face error run 
    ```
    `flutter pub run build_runner build --delete-conflicting-outputs`
    ``` +
    ```
    `pod install`(inside `#{gelato-api-mobile repo}/ios/`)
    ```
  before running above commands to build stage/prod ipa builds successfully.
* Eg. of **Build artifact path** in your repo:  `#{gelato-api-mobile repo}/build/ios/archive/Runner.xcarchive`


## Start automation Locally for IOS
* Inside your repo run: `cd integration-test`
* Run `npm run install-dep` to install all dependencies from package.json
* Make sure you have [appium](https://appium.io/docs/en/drivers/mac/) and appium inspector install in your system
* Create .env file in inside **integration-test** folder
  ```
  EMAIL_ID="<TESTING ACCOUNT EMAIL ID>"
  PASSWORD="<TESTING ACCOUNT PASSWORD>"
  ```
  Like this you can use any emailID and password of any account.
* To run test locally run: 
  ```
  `npm run ios`
  ```
* To inspect elements on safari browser of IOS follow [this](https://nerdschalk.com/how-to-inspect-element-on-iphone-everything-you-need-to-know/#:~:text=To%20do%20this%2C%20open%20the,Inspector'%20until%20it%20turns%20green.&text=Once%20you've%20successfully%20enabled,setup%20done%20on%20your%20Mac.) documentation 
* To inspect any element on native screen use appium inspector.


  
