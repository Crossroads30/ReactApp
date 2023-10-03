import Preloader from '../../Preloader/Preloader'
import cl from './User.module.css'
import defaultUserPhoto from '../../../../assets/images/userDefaultImage.png'
import ProfileStatus from '../ProfileStatus/ProfileStatus'

const User = props => {
	if (!props.userProfile) {
		return (
			<div className={cl.preloader}>
				<Preloader />
			</div>
		)
	}
	return (
		<>
			{/* <img
				className={cl.contentImg}
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFbPnraZxme2bIxu6D099w5lJ3p86n6fqww&usqp=CAU'
				alt='some image'
			/> */}
			<div className={cl.user}>
				<img
					className={cl.userImg}
					src={
						props.userProfile.photos.small !== null
							? props.userProfile.photos.small
							: defaultUserPhoto
					}
					alt='user-profile'
				/>
				<div className={cl.userInfo}>
					<p className={cl.name}>
						{props.userProfile.fullName.charAt(0).toUpperCase() +
							props.userProfile.fullName.slice(1)}
					</p>
					<ProfileStatus status={'Hello, i`m here!'} />
					<div className={cl.contactsWrapper}>
						<ul className={cl.contacts}>
							{Object.entries(props.userProfile.contacts).map(
								([key, value]) => {
									return (
										<li key={value + key}>
											<div className={cl.contactWrapper}>
												<p className={cl.key}>{key}:</p>
												<p className={cl.value}>{value}</p>
											</div>
										</li>
									)
								}
							)}
						</ul>
					</div>
					<p className={cl.jobLooking}>{props.userProfile.lookingForAJob}</p>
					<p className={cl.jobLookingDes}>
						{props.userProfile.lookingForAJobDescription}
					</p>
					<p className={cl.aboutMe}>About Me: {props.userProfile.aboutMe}</p>
				</div>
			</div>
		</>
	)
}

export default User
