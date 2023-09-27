import axios from 'axios'
import cl from './Users.module.css'
import defaultUserPhoto from '../../assets/images/userDefaultImage.png'
import React from 'react'

class Users extends React.Component {
	componentDidMount() {
		axios
			.get(
				`http://localhost:3000/items/?_limit=${this.props.pageSize}&_page=${this.props.currentPage}`
			)
			.then(response => {
				this.props.setUsers(response.data)
				// this.props.setTotalUsersCount(response.data.count.totalCount)
			})
	}

	onPageChange(pageNumber) {
		this.props.setCurrentPage(pageNumber)
		axios
			.get(
				`http://localhost:3000/items?_limit=${this.props.pageSize}&_page=${pageNumber}`
			)
			.then(response => {
				this.props.setUsers(response.data)
			})
	}

	render() {
		let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
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
								onClick={() => this.onPageChange(page)}
								className={
									this.props.currentPage === page
										? cl.selectedPage
										: cl.pagination + ' ' + 'span'
								}
							>
								{page}
							</span>
						))}
					</div>
					{this.props.users.map(user => (
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
											this.props.unfollow(user.id)
										}}
									>
										Unfollow
									</button>
								) : (
									<button
										className={cl.button}
										onClick={() => {
											this.props.follow(user.id)
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
}

export default Users
