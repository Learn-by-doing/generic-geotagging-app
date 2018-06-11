import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import './App.css';

class App extends Component {
  state = {
    lat: 50.1034007,
    lng: 14.4483626,
    zoom: 15,
    markers: [
      { position: [50.1034007, 14.4483626] },
    ],
  }

  addMarker = (e) => {
    this.setState({
      ...this.state,
      markers: [
        ...this.state.markers,
        {
          position: [e.latlng.lat, e.latlng.lng],
        }
      ],
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="App">
        <Map center={position} zoom={this.state.zoom} onClick={this.addMarker}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
          {this.state.markers.map((marker, index) => (
            <Marker position={marker.position} key={index} />
          ))}
        </Map>
      </div>
    );
  }
}

export default App;
