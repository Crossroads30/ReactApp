import React from 'react'
import Users from './Users'
import {
	follow,
	unfollow,
	setCurrentPage,
	setTotalUsersCount,
	getUsers,
} from '../../../BLL/react-redux/reducers/users-reducer'
import { getFriendsTC } from '../../../BLL/react-redux/reducers/sidebar-reducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../../HOC/withAuthRedirect'
import { compose } from 'redux'
import { getAllUsers, getCurrentPage, getFollowingInProgress, getIsLoading, getPageSize, getTotalUsersCount } from '../../../BLL/react-redux/selectors/users-selectors'

class UsersContainer extends React.Component {
	componentDidMount() {
		const { currentPage, pageSize } = this.props //диструктуризация пропсов внутри метода
		this.props.getUsers(currentPage, pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator
	}

	onPageChange = pageNumber => {
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
const setStateToProps = state => {
	return {
		users: getAllUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isLoading: getIsLoading(state),
		followingInProgress: getFollowingInProgress(state),
	}
}

export default compose(
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
