import React from 'react'
import {
	addPostActionCreator,
	updateNewPostActionCreator,
} from '../../../redux/profile-reducer'
import Posts from './Posts'

const PostsContainer = props => {

  const state = props.store.getState()

	const onAddPost = () => {
		props.store.dispatch(addPostActionCreator())
	}

	const onPostChange = newText => {
		const action = updateNewPostActionCreator(newText)
		props.store.dispatch(action)
	}

	return (
		<Posts
			updateNewPostText={onPostChange}
			addPost={onAddPost}
			posts={state.profilePage.posts}
			newPostText={state.profilePage.newPostText}
		/>
	)
}

export default PostsContainer
