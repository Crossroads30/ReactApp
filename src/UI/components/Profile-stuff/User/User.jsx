import Preloader from '../../common/Preloader/Preloader'
import cl from './User.module.css'
import defaultUserPhoto from '../../../../assets/images/userDefaultImage.png'
import ProfileStatus from '../ProfileStatus/ProfileStatusWithClass'
import ProfileStatusWithHooks from '../ProfileStatus/profileStatusWithHooks'

// const User = props => {
const User = ({ isOwner, userProfile, status, updateStatus, savePhoto }) => {
	//диструктуризация пропсов
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

	return (
		<>
			{/* <img
				className={cl.contentImg}
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFbPnraZxme2bIxu6D099w5lJ3p86n6fqww&usqp=CAU'
				alt='some image'
			/> */}
			<div className={cl.user}>
				<div className={cl.userPhoto}>
					<img className={cl.userImg} src={userProfile.photos.small !== null ? userProfile.photos.small : defaultUserPhoto} alt='user-profile' />
					{isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
				</div>
				<div className={cl.userInfo}>
					<p className={cl.name}>{userProfile.fullName.charAt(0).toUpperCase() + userProfile.fullName.slice(1)}</p>
					<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
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
				</div>
			</div>
		</>
	)
}

export default User
