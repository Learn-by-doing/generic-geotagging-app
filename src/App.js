import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Modal from './Modal';
import './App.css'
import config from './config';

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
      position: {
        lat: 50.1034007,
        lng: 14.4483626
      },
      zoom: 15,
      showAddItemModal: false,
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

  onAttributesSaved = event => {
    event.preventDefault();
    const category = event.target.elements.category.value;
    const description = event.target.elements.description.value;
    // here save category and description
    this.setState({showAddItemModal: false})
  }

  render() {
    return (
      <div className="App">
        <Map center={this.state.position} zoom={this.state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>

        <Modal show={this.state.showAddItemModal} title={config.addItemModal.title}>
          <form className="add-item-form" onSubmit={this.onAttributesSaved}>
            <label>
              Category:
              <select name="category">
                <option value="1">Category1</option>
                <option value="2">Category2</option>
              </select>
            </label>
            <label>
              Description:
              <input type="text" name="description" />
            </label>
            <label>
              <input type="submit" value="Submit" />
            </label>
          </form>
        </Modal>
      </div>
    )
  }
}

export default App
