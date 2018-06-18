import React, { Component } from 'react'
import { CircleMarker, Map, Marker, TileLayer } from 'react-leaflet'
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

const DialogAdd = ({ onSave }) => (
  <div className="DialogAdd">
    <h2>Add place</h2>
    <button onClick={onSave}>Save</button>
  </div>
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      position: {
        lat: 50.1034007,
        lng: 14.4483626
      },
      center: {
        lat: 50.1034007,
        lng: 14.4483626,
      },
      zoom: 15,
      items: [],
      dialogShown: false,
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
    this.setState({
      position: {
        lat,
        lng
      }
    })
  }

  addItem = () => {
    this.setState({
      items: [
        ...this.state.items,
        { position: this.state.center },
      ],
      dialogShown: false,
    })
  }

  toggleDialogAdd = () => {
    this.setState({
      dialogShown: !this.state.dialogShown,
    });
  }

  updateMapCenter = ({ center }) => {
    this.setState({
      center,
    });
  }

  render() {
    return (
      <div className="App">
        <Map center={this.state.position} zoom={this.state.zoom} onViewportChange={this.updateMapCenter}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker center={this.state.position} radius={10} />
          {this.state.items.map((item, index) => (
            <Marker position={item.position} key={index} />
          ))}
          <div className="Add">
            <button onClick={this.toggleDialogAdd}>Add</button>
          </div>
          { this.state.dialogShown && <DialogAdd onSave={this.addItem} />}
        </Map>
      </div>
    )
  }
}

export default App
