import React from 'react'
import {
	addPostActionCreator,
	updateNewPostActionCreator,
} from '../../../redux/profile-reducer'
import Posts from './Posts'
import StoreContext from '../../../context/Store-context'
import store from '../../../redux/redux-store'

const PostsContainer = props => {
	// const state = props.store.getState()

	// const onAddPost = () => {
	// 	props.store.dispatch(addPostActionCreator())
	// }

	// const onPostChange = newText => {
	// 	const action = updateNewPostActionCreator(newText)
	// 	props.store.dispatch(action)
	// }

	return (
		<StoreContext.Consumer>
			{store => {
				
				const state = store.getState()
				const onAddPost = () => {
					store.dispatch(addPostActionCreator())
				}

				const onPostChange = newText => {
					const action = updateNewPostActionCreator(newText)
					store.dispatch(action)
				}

				return (
					<Posts
						updateNewPostText={onPostChange}
						addPost={onAddPost}
						posts={store.getState().profilePage.posts}
						newPostText={store.getState().profilePage.newPostText}
					/>
				)
			}}
		</StoreContext.Consumer>
	)
}

export default PostsContainer

// <Posts
// 	updateNewPostText={onPostChange}
// 	addPost={onAddPost}
// 	posts={state.profilePage.posts}
// 	newPostText={state.profilePage.newPostText}
// />
