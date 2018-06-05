import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './App.css';
import Modal from './Modal';
import config from './config';

class App extends Component {

  state = {
    lat: 50.1034007,
    lng: 14.4483626,
    zoom: 15,
    showModal: false, // change to true, so the modal is visible
  }

  handleSubmit = event => {
    event.preventDefault();
    const category = event.target.elements.category.value;
    const description = event.target.elements.description.value;
    console.log('category', category);
    console.log('description', description);
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

        <Modal show={this.state.showModal}
               title={config.modalCreateAttribute.title}>

                <form onSubmit={this.onAttributesSaved}>
                  <label>
                    Category:
                    <select name="category">
                      <option value="1">1</option>
                      <option value="2">2</option>
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
    );
  }
}

export default App;
