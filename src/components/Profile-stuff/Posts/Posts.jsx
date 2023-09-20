import Post from '../Post/Post'
import cl from './Posts.module.css'
import React from 'react'
import { addPostActionCreator, updateNewPostActionCreator } from '../../../redux/profile-reducer'

const Posts = props => {
	const postsElements = props.posts.map(post => (
		<Post text={post.message} likes={post.likes} key={post.id} />
	))

	const newPostElement = React.createRef()
	
	const addPost = () => {
		// props.addPost()
		// props.dispatch({type: 'ADD-POST'})
		props.dispatch(addPostActionCreator())
	}

	const onPostChange = () => {
		const text = newPostElement.current.value
		// props.updateNewPostText(newText)
		// props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: text })
		props.dispatch(updateNewPostActionCreator(text))
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
