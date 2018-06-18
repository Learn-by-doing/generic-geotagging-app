import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Buffer from './Buffer'
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
      position: {
        lat: 50.1034007,
        lng: 14.4483626
      },
      zoom: 15
    }
  }

  componentWillMount() {
    // Buffer is needed for working with IPFS:
    window.Buffer = Buffer
    // Wait for window load event because we are loading IPFS from a remote.
    window.addEventListener('load', function() {
      // https://github.com/ipfs/js-ipfs#api
      const node = new window.Ipfs({ start: false })
      node.on('ready', function() {
        // Use a promise:
        node.start()
        .then(function() {
          console.log('Node started!')
          // !! JUST A TEST !!
          // If you see "hello, again" in the console (in the browser) then success!
          node.files.get('QmbC9SwhwdBXaG1hRjGjbeH6HhxSmEPC5pmWhBQ5EibdkW', function(error, result) {
            console.log((new Buffer(result[0].content)).toString());
          })
        })
        .catch(error => console.error('Node failed to start!', error))
      })
    })
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

  render() {
    return (
      <div className="App">
        <Map center={this.state.position} zoom={this.state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </Map>
      </div>
    )
  }
}

export default App
