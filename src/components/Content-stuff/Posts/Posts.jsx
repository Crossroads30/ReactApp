import Post from '../Post/Post'
import cl from './Posts.module.css'

const Posts = () => {
	return (
		<div className={cl.posts}>
			<textarea className={cl.newPost} placeholder='you news'></textarea>
			<button>send</button>
			<Post text='hi there!!!' likes='5' />
			<Post text='good night' likes='10' />
			<Post text='good night' likes='10' />
		</div>
	)
}

export default Posts
