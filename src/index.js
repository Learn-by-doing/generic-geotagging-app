import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../node_modules/leaflet/dist/leaflet.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
