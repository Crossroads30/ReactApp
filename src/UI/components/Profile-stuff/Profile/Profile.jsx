import PostsContainer from '../Posts/PostsContainer'
import User from '../User/User'
import cl from './Profile.module.css'

const Profile = ({ userProfile, status, updateStatus }) => {
	return (
		<main className={cl.content}>
			<User userProfile={userProfile} status={status} updateStatus={updateStatus} />
			<PostsContainer />
		</main>
	)
}

export default Profile
{
	/*store={store}*/
}

// userProfile={setUserProfile}
