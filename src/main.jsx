import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './react-redux/react-redux-store' //store из react-redux
import { Provider } from 'react-redux'

let root = ReactDOM.createRoot(document.getElementById('root'))

	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	)