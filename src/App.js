import React, { Component } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import './App.css'

function geolocationErrorHandler(err) {
  const { code } = err
  switch (code) {
    case 1:
      console.log('Permission denied -- please allow geolocation')
      break
    case 2:
      console.log('Position unavailable -- try again later')
      break
    case 3:
      console.log('Position querying timed out -- try again later')
      break
    default:
      console.log('Unknown error happened while querying position')
      break
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      lat: 50.1034007,
      lng: 14.4483626,
      zoom: 15,
      markers: [
        { position: [50.1034007, 14.4483626] },
      ],
    }
  }

  componentWillMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        res => {
          this.updateCoords(res.coords.latitude, res.coords.longitude)
        },
        err => {
          geolocationErrorHandler(err)
        }
      )
    }
  }

  updateCoords(lat, lng) {
    this.setState({ lat, lng })
  }

  addMarker = (e) => {
    this.setState({
      markers: [
        ...this.state.markers,
        { position: [e.latlng.lat, e.latlng.lng] },
      ],
    })
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="App">
        <Map center={position} zoom={this.state.zoom} onClick={this.addMarker}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.markers.map((marker, index) => (
            <Marker position={marker.position} />
          ))}
        </Map>
      </div>
    )
  }
}

export default App
