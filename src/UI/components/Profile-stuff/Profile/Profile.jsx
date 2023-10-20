import PostsContainer from '../Posts/PostsContainer'
import User from '../User/User'
import cl from './Profile.module.css'

const Profile = ({ isOwner, userProfile, status, updateStatus, savePhoto, saveUserData }) => {
	return (
		<main className={cl.content}>
			<User isOwner={isOwner} userProfile={userProfile} status={status} updateStatus={updateStatus} savePhoto={savePhoto} saveUserData={saveUserData} />
			<PostsContainer />
		</main>
	)
}

export default Profile
{
	/*store={store}*/
}

// userProfile={setUserProfile}
