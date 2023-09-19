import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import state, {
	updateNewPostText,
	updateNewMessage,
	addMessage,
	addPost,
  subscribe,
} from './redux/state'

let root = ReactDOM.createRoot(document.getElementById('root'))

const rerenderTree = (state) => {
	root.render(
		<App
			appData={state}
			addPost={addPost}
			updateNewPostText={updateNewPostText}
			addMessage={addMessage}
			updateNewMessage={updateNewMessage}
		/>
	)
}
rerenderTree(state)

subscribe(rerenderTree)