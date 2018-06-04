import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './App.css';

class App extends Component {
  state = {
    lat: 50.1034007,
    lng: 14.4483626,
    zoom: 15,
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="App">
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    );
  }
}

export default App;
