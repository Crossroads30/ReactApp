import Preloader from '../../common/Preloader/Preloader'
import cl from './User.module.css'
import defaultUserPhoto from '../../../../assets/images/userDefaultImage.png'
import UserData from './UserData.tsx'
import { EditReduxForm } from './UserDataForm.tsx'
import { ChangeEvent, FC, useState } from 'react'
import React from 'react'
import { ProfileType } from '../../../../types/types'

type PropsType = {
	isOwner: boolean
	userProfile: ProfileType | null
	status: string
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveUserData: (formData: ProfileType) => Promise<any>
}

const User: FC<PropsType> = ({
	isOwner,
	userProfile,
	status,
	updateStatus,
	savePhoto,
	saveUserData,
}) => {
	let [formEditMode, setFormEditMode] = useState(false)

	if (!userProfile) {
		return (
			<div className={cl.preloader}>
				<Preloader />
			</div>
		)
	}

	const onMainPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
		event.target.files?.length && savePhoto(event.target.files[0]) //условие - если фото есть(event.target.files.length), то тогда передаем его в props(в ts для типизации в это условие добавляем '?' после files(event.target.files?.length) - это тоже что и if(event.target.files && event.target.files.length))
	}

	// const onSubmitEditForm = formData => {
	// 	//передаем formData(то что соберет Redux Form во всех полях своей формы ) в санку saveUserData
	// 	saveUserData(formData)
	// 	//если санка завершилась успешно, то тогда выключаем editMode
	// 	if (userDataStatus === 'success') {
	// 		setFormEditMode(false)
	// 	}
	// }

	const onSubmitEditForm = (formData: ProfileType) => {
		//передаем formData(то что соберет Redux Form во всех полях своей формы ) в санку saveUserData
		saveUserData(formData)
			//если санка завершилась успешно, то тогда выключаем editMode
			//что бы это работало необходимо в санке saveUserData после диспатча с ошибкой вернуть Promise.reject()
			.then(() => {
				setFormEditMode(false)
			})
	}

	return (
		<>
			<div className={cl.user}>
				<div className={cl.userPhoto}>
					<img className={cl.userImg} src={userProfile.photos.small !== null ? userProfile.photos.small : defaultUserPhoto} alt='user-profile' />
					{isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
				</div>
				{formEditMode ? (
					/* передаем в initialValues userProfile для того что бы в полях формы значения по умолчанию брались из объекта 'profile' на сервере */
					<EditReduxForm initialValues={userProfile} onSubmit={onSubmitEditForm} userProfile={userProfile} />
				) : (
					<UserData
						userProfile={userProfile}
						status={status}
						updateStatus={updateStatus}
						isOwner={isOwner}
						goToEditMode={() => {
							setFormEditMode(true)
						}}
					/>
				)}
			</div>
		</>
	)
}

export default User

//-------------------------
	/* код ниже перенесен в UserData */
	/* <div className={cl.userInfo}>
					<p className={cl.name}>{userProfile.fullName.charAt(0).toUpperCase() + userProfile.fullName.slice(1)}</p>
					<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
					<div className={cl.jobLooking}>
						<div className={cl.isLooking}>
							<b>Looking for a job:</b>
							{userProfile.lookingForAJob ? 'Yes' : 'No'}
						</div>
						{userProfile.lookingForAJob && (
							<div className={cl.skills}>
								<b>My skills:{userProfile.lookingForAJobDescription}</b>
							</div>
						)}
					</div>
					<div className={cl.contactsWrapper}>
						<ul className={cl.contacts}>
							{Object.entries(userProfile.contacts).map(([key, value]) => {
								return (
									<li key={value + key}>
										<div className={cl.contactWrapper}>
											<p className={cl.key}>{key}:</p>
											<p className={cl.value}>{value}</p>
										</div>
									</li>
								)
							})}
						</ul>
					</div>
					<p className={cl.jobLooking}>{userProfile.lookingForAJob}</p>
					<p className={cl.jobLookingDes}>{userProfile.lookingForAJobDescription}</p>
					<p className={cl.aboutMe}>About Me: {userProfile.aboutMe}</p>
				</div> */
