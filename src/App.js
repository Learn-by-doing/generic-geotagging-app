import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CircleMarker, Map, Marker, TileLayer } from 'react-leaflet'
import './App.css'

// Hack to show markers correctly
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
/* eslint-disable */
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
/* eslint-enable */

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

DialogAdd.propTypes = {
  onSave: PropTypes.func.isRequired
}

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
        lng: 14.4483626
      },
      zoom: 15,
      items: [],
      dialogShown: false
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
      items: [...this.state.items, { position: this.state.center }],
      dialogShown: false
    })
  }

  toggleDialogAdd = () => {
    this.setState({
      dialogShown: !this.state.dialogShown
    })
  }

  updateMapCenter = ({ center }) => {
    this.setState({
      center
    })
  }

  updateItemPosition = index => e => {
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        {
          ...this.state.items[index],
          position: [e.target._latlng.lat, e.target._latlng.lng] // eslint-disable-line
        },
        ...this.state.items.slice(index + 1)
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <Map
          center={this.state.position}
          zoom={this.state.zoom}
          onViewportChange={this.updateMapCenter}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CircleMarker center={this.state.position} radius={10} />
          {this.state.items.map((item, index) => (
            <Marker
              position={item.position}
              key={`marker-${index + 1}`}
              draggable
              onDragEnd={this.updateItemPosition(index)}
            />
          ))}
          <div>
            <button
            className="Add" 
            onClick={this.toggleDialogAdd}>
            <span>ADD </span>
            </button>
          </div>
          {this.state.dialogShown && <DialogAdd onSave={this.addItem} />}
        </Map>
      </div>
    )
  }
}

export default App
