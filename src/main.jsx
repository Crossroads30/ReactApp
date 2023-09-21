import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/redux-store' //store из redux

let root = ReactDOM.createRoot(document.getElementById('root'))

const rerenderTree = state => {
	root.render(
		<App state={state} dispatch={store.dispatch.bind(store)} store={store} />
	)
}

rerenderTree(store.getState())

store.subscribe(() => {
	let state = store.getState()
	rerenderTree(state)
}) // для redux store т.к. state(this._callRerenderTree(this._state)) // для redux-store не вызывается !!!!!
