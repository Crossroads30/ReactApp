import cl from './Users.module.css'
import defaultUserPhoto from '../../assets/images/userDefaultImage.png'
import Preloader from '../Preloader/Preloader'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

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
					<Preloader />
				) : (
					props.users.map(user => (
						<div key={user.id} className={cl.user}>
							<div className={cl.avatarWrapper}>
								<NavLink to={'/profile/' + user.id}>
									<img
										className={cl.photo}
										src={
											user.photos.small !== null
												? user.photos.small
												: defaultUserPhoto
										}
										alt='User'
									/>
								</NavLink>
								{user.isFollowed ? (
									<button
										className={cl.button}
										onClick={() => {
											axios
												.delete(
													`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
													{ withCredentials: true } // в delete объект настройки идет вторым параметром
												)
												.then(response => {
													response.data.resultCode === 0 &&
														props.unfollow(user.id)
												})
										}}
									>
										Unfollow
									</button>
								) : (
									<button
										className={cl.button}
										onClick={() => {
											axios
												.post(
													`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
													{},
													{ withCredentials: true } // в post объект настройки идет третьем параметром
												)
												.then(response => {
													response.data.resultCode === 0 &&
														props.follow(user.id)
												})
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
					))
				)}
			</div>
		</>
	)
}

export default Users

//версия кнопок без запроса на сервер:
// {
// 	user.isFollowed ? (
// 		<button
// 			className={cl.button}
// 			onClick={() => {
// 				props.unfollow(user.id)
// 			}}
// 		>
// 			Unfollow
// 		</button>
// 	) : (
// 		<button
// 			className={cl.button}
// 			onClick={() => {
// 				props.follow(user.id)
// 			}}
// 		>
// 			follow
// 		</button>
// 	)
// }
//------------------------

// {//версия кнопок c запросом на сервер:
// 	{user.isFollowed ? (
// 		<button
// 			className={cl.button}
// 			onClick={() => {
// 				axios
// 					.delete(
// 						`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
// 						{ withCredentials: true } // в delete объект настройки идет вторым параметром
// 					)
// 					.then(response => {
// 						response.data.resultCode === 0 && props.unfollow(user.id)
// 					})
// 			}}
// 		>
// 			Unfollow
// 		</button>
// 	) : (
// 		<button
// 			className={cl.button}
// 			onClick={() => {
// 				// axios.create({
// 				// 	withCredentials: true,
// 				// 	baseURL:
// 				// 		'https://social-network.samuraijs.com/api/1.0/',
// 				// 	headers: {
// 				// 		'API-KEY': '3f7ad031-df1b-42ff-b2a2-b96c84e80631',
// 				// 	},
// 				// })
// 				axios
// 					.post(
// 						`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
// 						{},
// 						{ withCredentials: true } // в post объект настройки идет третьем параметром
// 					)
// 					.then(response => {
// 						response.data.resultCode === 0 && props.follow(user.id)
// 					})
// 			}}
// 		>
// 			Follow
// 		</button>
// 	)
// }