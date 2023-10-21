import Preloader from '../../common/Preloader/Preloader'
import cl from './User.module.css'
import defaultUserPhoto from '../../../../assets/images/userDefaultImage.png'
import ProfileStatus from '../ProfileStatus/ProfileStatusWithClass'
import ProfileStatusWithHooks from '../ProfileStatus/profileStatusWithHooks'
import UserData from './UserData'
import UserDataForm, { EditReduxForm } from './UserDataForm'
import { useEffect, useState } from 'react'

// const User = props => {
const User = ({
	isOwner,
	userProfile,
	status,
	updateStatus,
	savePhoto,
	saveUserData,
	userDataStatus,
}) => {
	//диструктуризация пропсов, незабываем фигурные скобки!!!
	// debugger
	let [formEditMode, setFormEditMode] = useState(false)

	if (!userProfile) {
		return (
			<div className={cl.preloader}>
				<Preloader />
			</div>
		)
	}

	const onMainPhotoSelected = event => {
		event.target.files.length && savePhoto(event.target.files[0]) //условие - если фото есть(event.target.files.length), то тогда передаем его в props
	}

	// const onSubmitEditForm = formData => {
	// 	//передаем formData(то что соберет Redux Form во всех полях своей формы ) в санку saveUserData
	// 	saveUserData(formData)
	// 	//если санка завершилась успешно, то тогда выключаем editMode
	// 	if (userDataStatus === 'success') {
	// 		setFormEditMode(false)
	// 	}
	// }

	const onSubmitEditForm = formData => {
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
					<img
						className={cl.userImg}
						src={userProfile.photos.small !== null ? userProfile.photos.small : defaultUserPhoto}
						alt='user-profile'
					/>
					{isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
				</div>
				{formEditMode ? (
					/* передаем в initialValues userProfile для того что бы в полях формы значения по умолчанию брались из объекта 'profile' на сервере */
					<EditReduxForm
						initialValues={userProfile}
						onSubmit={onSubmitEditForm}
						userProfile={userProfile}
					/>
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

				{/* код ниже перенесен в UserData */}
				{/* <div className={cl.userInfo}>
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
				</div> */}
			</div>
		</>
	)
}

export default User
