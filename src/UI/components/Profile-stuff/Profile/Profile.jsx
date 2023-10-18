import PostsContainer from '../Posts/PostsContainer'
import User from '../User/User'
import cl from './Profile.module.css'

const Profile = ({ isOwner, userProfile, status, updateStatus, savePhoto }) => {
	return (
		<main className={cl.content}>
			<User savePhoto={savePhoto} isOwner={isOwner} userProfile={userProfile} status={status} updateStatus={updateStatus} />
			<PostsContainer />
		</main>
	)
}

export default Profile
{
	/*store={store}*/
}

// userProfile={setUserProfile}
