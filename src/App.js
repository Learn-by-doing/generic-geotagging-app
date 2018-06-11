import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './App.css';



class App extends Component {
  state = {
    lat: 50.1034007,
    lng: 14.4483626,
    zoom: 15,
    dialogShown: false,
  }

  constructor(props) {
    super(props);
    this.state = {dialogShown: true};

    // This binding is necessary to make `this` work in the callback
    this.toggleDialogAdd = this.toggleDialogAdd.bind(this);
  }

  toggleDialogAdd() {
    this.setState({
      dialogShown: this.state.dialogShown ? false : true
    });
    console.log(this.state.dialogShown);
  }

  renderDialog() {
    if (this.state.dialogShown===true) {
      return <DialogAdd/>
    }
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
        <div className="Add">
          <button onClick={this.toggleDialogAdd}>Add</button>
        </div>
        {this.renderDialog()}


      </div>
    );
  }
}


class DialogAdd extends Component {
  render() {
    return (
      <div className="DialogAdd">
        <h2>Add place</h2>
      </div>
    );
  }
}

export default App;
