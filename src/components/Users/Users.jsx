import cl from './Users.module.css'

const Users = props => {
	if (props.users.length === 0) {
		props.setUsers([
			{
				id: 1,
				isFollowed: false,
				fullName: 'Darken Rahl',
				avatarUrl:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
				status: 'I`m want to rule all Midlands!!!',
				location: { city: 'city of D`Hara', land: 'D`Hara' },
			},
			{
				id: 2,
				isFollowed: true,
				fullName: 'Richard Cypher-Rahl',
				avatarUrl:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
				status: 'I`m a truth seeker',
				location: { city: 'Hartland', land: 'Westland' },
			},
			{
				id: 3,
				isFollowed: true,
				fullName: ' Kahlan Amnell',
				avatarUrl:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
				status: 'The whole Middle lands under my protection!',
				location: { city: 'Aydindril', land: 'Midlands' },
			},
			{
				id: 4,
				isFollowed: true,
				fullName: 'Zeddicus Zu`l Zorander ',
				avatarUrl:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
				status: 'I`m a greatest wizard of the First Order!',
				location: { city: 'Aydindril', land: 'Midlands' },
			},
		])
	}

	return (
		<div className={cl.usersWrapper}>
			{props.users.map(user => (
				<div key={user.id} className={cl.user}>
					<div className={cl.avatarWrapper}>
						<img className={cl.photo} src={user.avatarUrl} alt='User' />
						{user.isFollowed ? (
							<button
								className={cl.button}
								onClick={() => {
									props.unfollow(user.id)
								}}
							>
								Unfollow
							</button>
						) : (
							<button
								className={cl.button}
								onClick={() => {
									props.follow(user.id)
								}}
							>
								follow
							</button>
						)}
					</div>
					<div className={cl.userInfo}>
						<div className={cl.infoWrapper}>
							<p>{user.fullName}</p>
							<p>{user.status}</p>
						</div>
						<div className={cl.locationWrapper}>
							<p>{user.location.city}</p>
							<p>{user.location.land}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Users
