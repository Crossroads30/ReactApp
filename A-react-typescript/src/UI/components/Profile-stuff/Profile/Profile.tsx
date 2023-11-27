import PostsContainer from '../Posts/PostsContainer.tsx'
import User from '../User/User.jsx'
import cl from './Profile.module.css'
import React from 'react'

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
