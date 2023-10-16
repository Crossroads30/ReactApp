import cl from './Users.module.css'
import defaultUserPhoto from '../../../assets/images/userDefaultImage.png'
import { NavLink } from 'react-router-dom'


const SeparateUser = ({ user, ...props }) => {
	return (
		<div className={cl.user}>
			<div className={cl.avatarWrapper}>
				<NavLink to={'/profile/' + user.id}>
					<img className={cl.photo} src={user.photos.small !== null ? user.photos.small : defaultUserPhoto} alt='User' />
				</NavLink>
				{user.followed ? (
					<button
						disabled={props.followingInProgress.some(
							// кнопка становится неактивной во время запроса на подписку/отписку(follow/unfollow) на пользователя
							id => id === user.id
						)}
						className={cl.button}
						onClick={() => {
							props.unfollow(user.id) // thunkCreator unfollow
							props.setFriend() // ссылка на thunkCreator getFriendsTC из sidebar-reducer
						}}
					>
						Unfollow
					</button>
				) : (
					<button
						disabled={props.followingInProgress.some(
							// кнопка становится неактивной во время запроса на подписку/отписку(follow/unfollow) на пользователя
							id => id === user.id
						)}
						className={cl.button}
						onClick={() => {
							props.follow(user.id) // thunkCreator follow
							props.setFriend() // ссылка на thunkCreator getFriendsTC из sidebar-reducer
						}}
					>
						Follow
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
	)
}

export default SeparateUser
