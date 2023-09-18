import Post from '../Post/Post'
import cl from './Posts.module.css'

const Posts = (props) => {
	return (
		<div className={cl.posts}>
			<div className={cl.textWrapper}>
				<textarea className={cl.newPost} placeholder='you news'></textarea>
				<button>send</button>
			</div>
			{props.posts.map(post => (
				<Post text={post.message} likes={post.likes} key={post.id} />
			))}
		</div>
	)
}

export default Posts
