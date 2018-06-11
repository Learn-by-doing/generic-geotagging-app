import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "./App.css";

class App extends Component {
  state = {
    lat: 50.1034007,
    lng: 14.4483626,
    zoom: 15
  };

  updateCoords(lat, lng) {
    this.setState({ lat, lng });
  }

  geolocationErrorHandler(err) {
    const { code } = err;
    switch (code) {
      case 1:
        console.log("Permission denied -- please allow geolocation");
        break;
      case 2:
        console.log("Position unavailable -- try again later");
        break;
      case 3:
        console.log("Position querying timed out -- try again later");
        break;
      default:
        console.log("Unknown error happened while querying position");
        break;
    }
  }

  componentWillMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          this.updateCoords(res.coords.latitude, res.coords.longitude);
        },
        err => {
          this.geolocationErrorHandler(err);
        }
      );
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="App">
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
      </div>
    );
  }
}

export default App;
