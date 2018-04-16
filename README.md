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
