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

const DialogDetail = ({ lat, onSave, name, id}) => (
  <div className="DialogDetail">
   
    <h2>Edit place</h2>
    <div>
      Point number:
    <input type='text' defaultValue={name} name='point_number' />
    </div>
    <div>
      Point name:
    <input type='text' defaultValue={id} name='point_name' />
    </div>
    <div>
      Location:
    <br />
      latitude: {lat.position[0]}
      <br />
      longitude: {lat.position[1]}

    </div>
    <div>
      Description: <br />
     <textarea></textarea>

    </div>

    <br />
    <button onClick={onSave}>Save Details</button>
    <br />
   
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
      detailDialog: false,
      detail: {
        id: null
      }
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
    console.log(this.state)
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

  showDetails = (index) => {



    this.setState((prevState) => {
      return {
        detailDialog: !prevState.detailDialog,
        detail: { id: index }
      }
    });
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
          <Marker position={this.state.position} radius={10} />
          {this.state.items.map((item, index) => (
            <Marker
              position={item.position}
              key={index}
              draggable={true}
              onDragEnd={this.updateItemPosition(index)} onClick={() => this.showDetails(index)}
            />
          ))}

          <div className="Add">
            <button onClick={this.toggleDialogAdd}>Add</button>
          </div>
          {this.state.detailDialog && <DialogDetail onSave={this.saveItemDetails} name="location_point_name" id="location_point_id" lat={this.state.items[this.state.detail.id]} />}
          {this.state.dialogShown && <DialogAdd onSave={this.addItem} />}

        </Map>
      </div>
    )
  }
}

export default App
