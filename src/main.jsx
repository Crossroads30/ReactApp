import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './BLL/react-redux/reducers/react-redux-store.js' //store из react-redux
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

let root = ReactDOM.createRoot(document.getElementById('root'))

	root.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	)