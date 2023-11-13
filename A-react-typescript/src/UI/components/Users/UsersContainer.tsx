import React from 'react'
import Users from './Users.tsx'
import {
	follow,
	unfollow,
	setCurrentPage,
	setTotalUsersCount,
	getUsers,
} from '../../../BLL/react-redux/reducers/users-reducer.ts'
import { getFriendsTC } from '../../../BLL/react-redux/reducers/sidebar-reducer.ts'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../../HOC/withAuthRedirect.jsx'
import { compose } from 'redux'
import { getAllUsers, getCurrentPage, getFollowingInProgress, getIsLoading, getPageSize, getTotalUsersCount } from '../../../BLL/react-redux/selectors/users-selectors.ts'
import { UserType } from '../../../types/types.ts'
import { AppStateType } from '../../../BLL/react-redux/reducers/react-redux-store.ts'

type PropsType = {
	currentPage: number
	pageSize: number
	getUsers: (currentPage: number, pageSize: number) => void
	users: Array<UserType>
	totalUsersCount: number
	isLoading: boolean
	followingInProgress: Array<number>

	getFriendsTC: () => void
	follow: () => void
	unfollow: () => void
}

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const { currentPage, pageSize } = this.props //диструктуризация пропсов внутри метода
		this.props.getUsers(currentPage, pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator
	}

	onPageChange = (pageNumber: number) => {
		const { pageSize } = this.props //диструктуризация пропсов внутри метода
		this.props.getUsers(pageNumber, pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator getUsers
	}

	onUserToFriends = () => {
		this.props.getFriendsTC()
	}

	render() {
		return (
			<>
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChange={this.onPageChange}
					users={this.props.users}
					unfollow={this.props.unfollow}
					follow={this.props.follow}
					isLoading={this.props.isLoading}
					followingInProgress={this.props.followingInProgress}
					setFriend={this.props.getFriendsTC}
				/>
			</>
		)
	}
}

// const setStateToProps = state => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isLoading: state.usersPage.isLoading,
// 		followingInProgress: state.usersPage.followingInProgress,
// 	}
// }

//selectors:
const setStateToProps = (state: AppStateType) => {
	return {
		users: getAllUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isLoading: getIsLoading(state),
		followingInProgress: getFollowingInProgress(state),
	}
}

export default compose<PropsType>( // передаем типы в compose
	connect(setStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		setTotalUsersCount,
		getUsers,
		getFriendsTC,
	})
	// withAuthRedirect
)(UsersContainer)
