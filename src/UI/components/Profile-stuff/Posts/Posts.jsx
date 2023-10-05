import Post from '../Post/Post'
import cl from './Posts.module.css'
import React from 'react'
import { PostsReduxForm } from './PostsForm'

const Posts = props => {
	const postsElements = props.posts.map(post => (
		<Post text={post.message} likes={post.likes} key={post.id} />
	))

	const addNewPost = formData => {
		const newPostBody = formData.newPostText
		props.addPost(newPostBody)
	}

	return (
		<div className={cl.posts}>
			<PostsReduxForm onSubmit={addNewPost} />
			{postsElements}
		</div>
	)
}

export default Posts
