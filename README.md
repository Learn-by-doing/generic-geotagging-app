# Generic GeoTagging App

The goal of this project is to create a generic geotagging application that can be used as a base for specialized geotagging applications.

* Front-end web (HTML, CSS, JavaScript)
* [OpenStreetMap](https://www.openstreetmap.org/)
* [D3](https://d3js.org/) for working with the location data (latitude, longitude)
* [Cordova](https://cordova.apache.org/) to build the app for Android and iOS
* Data storage (meta data, image uploads, etc) can be one of the following:
  * [Node.js](https://nodejs.org/en/) web API
  * [IPFS](https://ipfs.io/)

The learning by doing [hobobar project](https://github.com/Learn-by-doing/hobobar) from earlier this year can be used as a starting point.

## Android Magic

To create an Android device to later run in the emulator:
```bash
~/Android/Sdk/tools/bin/avdmanager create avd -n test -k "system-images;android-27;google_apis;x86"
```

Run the device in the emulator:
```bash
~/Android/Sdk/tools/emulator -avd test
```

## Mac + iOS + Expo

Install node.js and npm. Recommended: use the homebrew package manager:
http://blog.teamtreehouse.com/install-node-js-npm-mac

On your iOS device, install the Expo app, which will enable you to preview your app on the device as you work:
https://expo.io/

Fork this repository. Clone your fork onto your computer.

`cd` into the project folder and run `npm install` to fetch the project's node.js dependencies. Note: one of the dependencies may complain if you are not running a version of Python in the range [2.5, 3.0).

Run `npm start` to start the project.

Follow the instructions from the command line to email yourself a link to the app. Open the email on your iOS device and follow the link. It should launch your project in the Expo app.
