import React from 'react'
import Users from './Users'
import {
	follow,
	unfollow,
	setCurrentPage,
	setTotalUsersCount,
	getUsers,
} from '../../../BLL/react-redux/users-reducer'
import { getFriendsTC } from '../../../BLL/react-redux/sidebar-reducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../../HOC/withAuthRedirect' 
import { compose } from 'redux'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator
	}

	onPageChange = pageNumber => {
		this.props.getUsers(pageNumber, this.props.pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator getUsers
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


const setStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isLoading: state.usersPage.isLoading,
		followingInProgress: state.usersPage.followingInProgress,
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
	}),
	// withAuthRedirect 
)(UsersContainer)