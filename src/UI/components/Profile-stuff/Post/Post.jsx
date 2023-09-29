import cl from './Post.module.css'

const Post = props => {
	return (
		<div className={cl.post}>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQP7ARHenfnGXcxCIhmDxObHocM8FPbjyaBg&usqp=CAU'
				alt='avatar'
				className={cl.avatar}
			/>
			<p className={cl.text}>{props.text}</p>
			<span>Likes {props.likes}</span>
		</div>
	)
}

export default Post
