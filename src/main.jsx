import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/redux-store' //store из redux
import { Provider } from './context/Store-context'

let root = ReactDOM.createRoot(document.getElementById('root'))

//используем контекст:
const rerenderTree = () => {
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	)
}

rerenderTree(store.getState())

store.subscribe(() => {
	let state = store.getState()
	rerenderTree(state)
}) // state(this._callRerenderTree(this._state)) // для redux-store не вызывается !!!!!


//не используем контекст:
// const rerenderTree = state => {
// 	root.render(
// 			<App state={state} dispatch={store.dispatch.bind(store)} store={store} />
// 	)
// }