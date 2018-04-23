import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default class App extends React.Component {
  render() {
    return (
        <MapView region={{latitude: 50.0755, longitude: 14.4378,latitudeDelta: 0.0922,longitudeDelta: 0.0421,}}
                 provider={null}
                 rotateEnabled={false}
                 style={{flex: 1}}
                 showsUserLocation >
            <MapView.UrlTile urlTemplate="http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png" />
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
