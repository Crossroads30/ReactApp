import axios from 'axios'
import cl from './Users.module.css'
import defaultUserPhoto from '../../assets/images/userDefaultImage.png'

const Users = props => {
	const getAllUsers = () => {
		if (props.users.length === 0) {
			axios.get('http://localhost:3000/items').then(response => {
				props.setUsers(response.data)
			})
		}
	}

	return (
		<>
		<button onClick={getAllUsers}>Get all users</button>
			<div className={cl.usersWrapper}>
				{props.users.map(user => (
					<div key={user.id} className={cl.user}>
						<div className={cl.avatarWrapper}>
							<img
								className={cl.photo}
								src={
									user.photos.small !== null
										? user.photos.small
										: defaultUserPhoto
								}
								alt='User'
							/>
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
								<p>{user.name}</p>
								<p>{user.status}</p>
							</div>
							<div className={cl.locationWrapper}>
								<p>{'user.location.city'}</p>
								<p>{'user.location.land'}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Users
