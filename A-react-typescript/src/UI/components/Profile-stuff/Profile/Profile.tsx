import { ProfileType } from '../../../../types/types.ts'
import PostsContainer from '../Posts/PostsContainer.tsx'
import User from '../User/User.jsx'
import cl from './Profile.module.css'
import React, { FC } from 'react'
import { actions } from '../../../../BLL/react-redux/reducers/profile-reducer.ts'

type PropsType = {
	isOwner: boolean
	userProfile: ProfileType | null
	status: string
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveUserData: (formData: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = ({
	isOwner,
	userProfile,
	status,
	updateStatus,
	savePhoto,
	saveUserData,
	// userDataStatus,
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
				// userDataStatus={userDataStatus}
			/>
			<PostsContainer addPost={actions.addPost} />
		</main>
	)
}

export default Profile

	/*store={store}*/


// userProfile={setUserProfile}
