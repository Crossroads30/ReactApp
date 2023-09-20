import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/redux-store/redux-store' //store из redux
// import store from './redux/my-store/store' // мой store

let root = ReactDOM.createRoot(document.getElementById('root'))

const rerenderTree = (state) => {
	root.render(
		<App
			appData={state}
			dispatch={store.dispatch.bind(store)}
			// addPost={store.addPost.bind(store)}
			// updateNewPostText={store.updateNewPostText.bind(store)}
			// addMessage={store.addMessage.bind(store)}
			// updateNewMessage={store.updateNewMessage.bind(store)}
		/>
	)
}

rerenderTree(store.getState())

store.subscribe(() => {
	let state = store.getState() 
	rerenderTree(state)
}) // для redux store т.к. state(this._callRerenderTree(this._state)) // для redux-store не вызывается как в варианте ниже!!!!!


// rerenderTree(store.getState())
// store.subscribe(rerenderTree)// для своего store