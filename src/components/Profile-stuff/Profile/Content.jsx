import PostsContainer from '../Posts/PostsContainer'
import User from '../User/User'
import cl from './Content.module.css'

const Profile = props => {
	return (
		<main className={cl.content}>
			<User />
			<PostsContainer store={props.store} />
		</main>
	)
}

export default Profile
