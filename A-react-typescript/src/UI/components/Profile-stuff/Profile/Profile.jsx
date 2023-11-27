import PostsContainer from '../Posts/PostsContainer.tsx'
import User from '../User/User'
import cl from './Profile.module.css'

const Profile = ({
	isOwner,
	userProfile,
	status,
	updateStatus,
	savePhoto,
	saveUserData,
	userDataStatus,
}) => {
	return (
		<main className={cl.content}>
			<User
				isOwner={isOwner}
				userProfile={userProfile}
				status={status}
				updateStatus={updateStatus}
				savePhoto={savePhoto}
				saveUserData={saveUserData}
				userDataStatus={userDataStatus}
			/>
			<PostsContainer />
		</main>
	)
}

export default Profile
{
	/*store={store}*/
}

// userProfile={setUserProfile}
