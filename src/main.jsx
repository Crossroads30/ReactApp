import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './BLL/react-redux/reducers/react-redux-store.js' //store из react-redux
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'

let root = ReactDOM.createRoot(document.getElementById('root'))

	root.render(
		<HashRouter >
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	)