import cl from './Users.module.css'
import defaultUserPhoto from '../../assets/images/userDefaultImage.png'
import Preloader from '../Preloader/Preloader'

const Users = props => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return (
		<>
			<div className={cl.usersWrapper}>
				<div className={cl.pagination}>
					{pages.map(page => (
						<span
							key={page}
							className={
								props.currentPage === page
									? cl.selectedPage
									: cl.pagination + ' ' + 'span'
							}
							onClick={() => {
								props.onPageChange(page)
							}}
						>
							{page}
						</span>
					))}
				</div>
				{props.isLoading ? (
					 <Preloader/>
				) : 
				props.users.map(user => (
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
