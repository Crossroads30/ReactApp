import Post from '../Post/Post'
import cl from './Posts.module.css'
import React from 'react'

const Posts = props => {
	const postsElements = props.posts.map(post => (
		<Post text={post.message} likes={post.likes} key={post.id} />
	))

	const newPostElement = React.createRef()
	
	const addPost = () => {
		props.addPost()
	}

	const onPostChange = () => {
		const newText = newPostElement.current.value
		props.updateNewPostText(newText)
	}

	return (
		<div className={cl.posts}>
			<div className={cl.textWrapper}>
				<textarea
					ref={newPostElement}
					onChange={onPostChange}
					className={cl.newPost}
					value={props.newPostText}
					placeholder='  enter your news...'
				/>
				<button onClick={addPost}>send</button>
			</div>
			{postsElements}
		</div>
	)
}

export default Posts
