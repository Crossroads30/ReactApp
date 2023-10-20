import ProfileStatusWithHooks from '../ProfileStatus/profileStatusWithHooks'
import cl from './User.module.css'

export const UserData = ({ userProfile, status, updateStatus} ) => {
	//диструктуризация пропсов, незабываем фигурные скобки!!!
	return (
		<div className={cl.userInfo}>
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
		</div>
	)
}
