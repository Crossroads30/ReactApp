import Preloader from '../../Preloader/Preloader'
import cl from './User.module.css'

const User = props => {
	if (!props.userProfile) {
		return <Preloader />
	}
	return (
		<>
			<img
				className={cl.contentImg}
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFbPnraZxme2bIxu6D099w5lJ3p86n6fqww&usqp=CAU'
				alt='some image'
			/>
			<div className={cl.user}>
				{/* {props.userProfile.fullName.aboutMe} */}
				<img
					className={cl.userImg}
					src={props.userProfile.photos.small}
					alt='user-profile'
				/>
				<div className={cl.userInfo}>
					<p className={cl.name}>Name: {props.userProfile.fullName}</p>
					<div className={cl.contactsWrapper}>
						<ul className={cl.contacts}>
							{Object.entries(props.userProfile.contacts).map(
								([key, value]) => {
									return (
										<li>
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
