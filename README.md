
## To install the plugin run the following command
cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=myreversedclientid

## To generate Android SHA1 key run the following command, the default password is android:
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -list -v
