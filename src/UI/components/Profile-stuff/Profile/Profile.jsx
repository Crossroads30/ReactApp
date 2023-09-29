import PostsContainer from '../Posts/PostsContainer'
import User from '../User/User'
import cl from './Profile.module.css'

const Profile = props => {
	return (
		<main className={cl.content}>
			<User userProfile={props.userProfile} />
			<PostsContainer />
		</main>
	)
}

export default Profile
{
	/*store={props.store}*/
}

// userProfile={props.setUserProfile}