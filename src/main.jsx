import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import data from './redux/data.js'

ReactDOM.createRoot(document.getElementById('root')).render(
	<App appData={data} />
)
