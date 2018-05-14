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

Install Python (one of the dependencies when you are running `npm install` may complain if you aren't running a version >= 2.5 and < 3.0; you may need to temporarily run an older version of Python for this to work).

On your iOS device, install the Expo app (it will enable you to preview your app on the device as you work):
https://expo.io/

Fork this repository. Clone your fork onto your computer.

`cd` into the project folder and run `npm install` to fetch the project's node.js dependencies.

Run `npm start` to start the project. Follow the instructions on the command line to email the application link to yourself.
