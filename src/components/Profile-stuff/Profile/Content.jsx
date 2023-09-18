import Post from '../Post/Post'
import Posts from '../Posts/Posts'
import User from '../User/User'
import cl from './Content.module.css'

const Content = (props) => {
	return (
		<main className={cl.content}>
			<User />
			<Posts posts={props.data.posts} />
		</main>
	)
}

export default Content
