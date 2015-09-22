# Google Plus login with Ionic Framework

This repository is an example app of how to add Google Plus authentication into an Ionic Framework app.

**Why adding Google Authentication into your app will benefit you and your users?**

  - **Improve conversions:** Help people log into your app quickly without having to register a new user and remember another username and password.
  - **One login across every device:** Make it easy for people to log in and access their info across multiple platforms and devices.
  - **Build a trusted relationship:** Give people control over the info they share with your app.
  - **Access profile info:** like picture, gender, age, name, without having to ask for it.


## Google Authentication

There are different ways to integrate Google authentication into your Ionic app. However, not all of them use the native approach which uses Google+ app to perform the login instead of opening a popup requesting users to enter their credentials to login to google before granting access to your app.

The way it works for hybrid apps to use native api’s and sdk’s is simple, you need a piece (typically a PhoneGap/Cordova plugin) that connects native api’s and sdk’s with the javascript environment where the hybrid apps run. In this case we are going to use a great cordova plugin to interact with the native google sdk.


### Cordova plugin to login with Google+ on iOS and Android

This plugin was developed by [Eddy Verbruggen](http://twitter.com/eddyverbruggen) and it allows you to log in with your Google account on iOS and Android. You will not only get the email address of the user, but also stuff like their full name and gender.
You can find more information in the [cordova-plugin-googleplus documentation](https://github.com/EddyVerbruggen/cordova-plugin-googleplus).


Having said that, let’s take a look at the basic requirements for this tutorial.

**Requirements:**

- You need an Ionic app where you will integrate this login. You can either use a blank app, or an existing one. Ad time!:If you are looking for a beautiful starter app with login UI/UX you must have a look at our beautiful mobile themes, templates & components. Specially to our [Logins Category](https://ionicthemes.com/logins).
- You need to follow the setup steps for android (to enable google+ login on android)  
- You need to follow the setup steps for iOS (to enable google+ login on iOS)  
- Install Google+ Cordova/PhoneGap Plugin

### How it will look like:

**iOS:**

![](https://dl.dropboxusercontent.com/u/30675090/ionic_themes/google-login/ios-welcome.jpg)
![](https://dl.dropboxusercontent.com/u/30675090/ionic_themes/google-login/ios-google1.jpg)
![](https://dl.dropboxusercontent.com/u/30675090/ionic_themes/google-login/ios-google2.jpg)

**Android:**

![](https://dl.dropboxusercontent.com/u/30675090/ionic_themes/google-login/android-welcome.png)
![](https://dl.dropboxusercontent.com/u/30675090/ionic_themes/google-login/android-google1.png)
![](https://dl.dropboxusercontent.com/u/30675090/ionic_themes/google-login/android-google2.png)


## Step 1: Setup to communicate with Google+
There are some configurations you need to set in order to communicate your app with Google+

### iOS
1. To get your iOS API key, follow Step 1: Creating the Google Developers Console project of the [guide to Start integrating Google+ into your iOS app](https://developers.google.com/+/mobile/ios/getting-started).
2. [Enable Google services for your app](https://developers.google.com/mobile/add?platform=ios&cntapi=signin) to get a configuration file GoogleService-Info.plist which contains the REVERSED_CLIENT_ID that you will need during the plugin’s installation.

### Android
1. Follow Step 1: Enable the Google+ API of the guide: [Quick-start sample app for Android](https://developers.google.com/+/quickstart/android).
2. Make sure you execute the keytool steps or authentication will fail.

**To generate Android SHA1 key run the following command, the default password is android:**
```
$ keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -list -v
```


## Step 2: Install required cordova plugin to interact with Google+ native SDK

After you have done all the above configurations, it’s time to install the plugin into your app. Follow these steps to get this DONE:



1. Using your terminal window, go to your Ionic app folder
2. Run the following command to install the plugin changing the variable with your own value:
```
$ cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=myreversedclientid
```

GooglePlus.js is brought in automatically. There is no need to change or add anything in your html.

To see other ways to install the plugin or if you are using Phonegap Build, go to the [plugin documentation](https://github.com/EddyVerbruggen/cordova-plugin-googleplus).

#### What we have done so far:

- An Ionic app (existing or new one)
- A Google app with the proper configurations
- GooglePlus Plugin installed into your Ionic app


## Step 3: Adding Login/Logout functionality

Now we will go straight to the code so open your Ionic app with your preferred code editor.Personally I use and recommend [atom](https://atom.io/).

### Login

The best way to show you how to add Login functionality is with a real example of the code, here you can see an AngularJS controller that handles the google login for your app.

```javascript
.controller('WelcomeCtrl', function($scope, $state, UserService, $ionicLoading) {

  //This method is executed when the user press the "Login with Google" button
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login(
        {},
        function (user_data) {
          //for the purpose of this example I will store user data on local storage
          UserService.setUser({
            userID: user_data.userId,
            name: user_data.displayName,
            email: user_data.email,
            picture: user_data.imageUrl,
            accessToken: user_data.accessToken,
            idToken: user_data.idToken
          });

          $ionicLoading.hide();
          $state.go('app.home');
        },
        function (msg) {
          $ionicLoading.hide();
        }
    );
  };
})
```

Then in your html you should add a “Sign in with Google” button

```javascript
<a class="google-sign-in button button-block" ng-click="googleSignIn()">
   <span class="btn-copy">Sign in with Google</span>
</a>
```

### Logout

The following controller contains all the necessary code for the facebook sign out:
```javascript
.controller('HomeCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){

	$scope.user = UserService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
					template: 'Logging out...'
				});
				//google logout
				window.plugins.googleplus.logout(
					function (msg) {
						console.log(msg);
						$ionicLoading.hide();
						$state.go('welcome');
					},
					function(fail){
						console.log(fail);
					}
				);
			}
		});
	};
})
```

Then in your html you should add a “Log out” button

```javascript
<a class="button button-assertive button-block button-outline" ng-click="showLogOutMenu()">
    Log Out
</a>
```


Services

You also will need some services to store and get your user’s data. For the purpose of this example I will store user data on the device local storage but you should save it on a database.

```javascript
angular.module('services', [])

.service('UserService', function() {

//for the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
```

### What we have done so far:

- At this point you should have an Ionic app with Google login and logout functionalities working.
