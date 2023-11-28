import cl from './Users.module.css'
import Preloader from '../common/Preloader/Preloader.tsx'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/PagePaginator.tsx'
import SeparateUser from './SeparateUser.tsx'
import React, { FC } from 'react'
import { UserType } from '../../../types/types.ts'

type PropsType = {
	totalUsersCount: number
	pageSize: number
	onPageChange: (pageNumber: number) => void
	currentPage: number
	users: Array<UserType>
	isLoading: boolean
	followingInProgress: Array<number>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	setFriend: () => void
}

const Users: FC<PropsType> = ({totalUsersCount, pageSize, onPageChange, currentPage, ...props}) => { 
	return (
		<>
			<div className={cl.usersWrapper}>
				<Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChange={onPageChange} currentPage={currentPage} />
				{props.isLoading ? (
					<Preloader />
				) : (
					props.users.map(user => (
						<SeparateUser
							key={user.id}
							user={user}
							followingInProgress={props.followingInProgress}
							follow={props.follow}
							unfollow={props.unfollow}
							setFriend={props.setFriend}
						/>
					))
				)}
			</div>
		</>
	)
}

export default Users
