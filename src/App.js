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
      var node = new window.Ipfs({ start: false })
      node.on('ready', function() {
        // Use a promise:
        node.start()
        .then(function() {
          console.log('Node started!')
        })
        .catch(error => console.error('Node failed to start!', error))
      });
      var ipfs = {
        node: node,
        addFile: function(content, cb) {
          node.files.add(new Buffer(content), cb);
        },
        getFile: function(hash, cb) {
          node.files.get(hash, function(error, result) {
            console.log((new Buffer(result[0].content)).toString())
          });
        },
        connectToSwarm: function(cb) {
          node.swarm.peers().then(function(peers) {
            var peer = peers && peers.length > 0 && peers[0] || null;
            if (!peer) throw new Error('No one to connect to!');
            node.swarm.connect(peer.addr.toString())
              .then(function() {
                cb();
              }).catch(cb)
          }).catch(cb);
        }
      };
      window.ipfs = ipfs;
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
