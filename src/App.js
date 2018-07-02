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
// dan's creation
const PositionParagraph = ({currentLocation}) => (
  <div>
  <h3>Your current Location is:</h3>
  <p>Lattitude: {currentLocation.lat}</p>
  <p>Longtitude: {currentLocation.lng}</p>
  </div>
)

const DialogAdd = ({ onSave, currentLocation }) => (
  <div className="DialogAdd">
    <h2>Add place</h2>
    <button
    className="Button"
    onClick={onSave}>
    <span>SAVE</span>
    </button> 
    {/* dan's addition */}
    <PositionParagraph currentLocation={currentLocation}/>
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
        lng: 14.4483626
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
      items: [...this.state.items, { position: this.state.center }],
      dialogShown: false
    })

  }

  toggleDialogAdd = () => {
    console.log('Your current Lattitude: ' + this.state.position.lat)
    console.log('Your current Longtitude: ' + this.state.position.lng)
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
          position: [e.target._latlng.lat, e.target._latlng.lng]
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
              key={index}
              draggable={true}
              onDragEnd={this.updateItemPosition(index)}
            />
          ))}
          <div>
            <button
            className="Button AddButton" 
            onClick={this.toggleDialogAdd}>
            <span>ADD </span>
            </button>
          </div>
          {/* dan adding the currentLocation attribute */}
          {this.state.dialogShown && <DialogAdd onSave={this.addItem} currentLocation={{lat: this.state.position.lat, lng: this.state.position.lng, }}/>}
        </Map>
      </div>
    )
  }
}

export default App
