import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './redux/store'

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

store.rerender(rerenderTree)