import React from 'react'
import Users from './Users'
import { userApi } from '../../../DAL/api/api'

import {
	followUser,
	setUsers,
	unfollowUser,
	setCurrentPage,
	setIsLoading,
	setTotalUsersCount,
	setDisableFetchingButton,
} from '../../../BLL/react-redux/users-reducer'
import { connect } from 'react-redux'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.setIsLoading(true)

		userApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
			// data - то что пришло из ajax-запроса в DAL/api/api.js
			this.props.setIsLoading(false)
			this.props.setUsers(data)
			// this.props.setTotalUsersCount(data.data.totalCount)
		})
	}

	onPageChange = pageNumber => {
		//!!!!обратить внимание что этот синтаксис этого метода - стрелочная функция!!!!
		this.props.setCurrentPage(pageNumber)
		this.props.setIsLoading(true)

		userApi.getUsers(pageNumber, this.props.pageSize).then(data => {
			// data - то что пришло из ajax-запроса в DAL/api/api.js
			this.props.setUsers(data)
			this.props.setIsLoading(false)
		})
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
					unfollow={this.props.unfollowUser}
					follow={this.props.followUser}
					isLoading={this.props.isLoading}
					setDisableButton={this.props.setDisableFetchingButton}
					followingInProgress={this.props.followingInProgress}
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

// const setDispatchTpProps = dispatch => {
// 	return {
// 		follow: userId => {
// 			dispatch(followUserAC(userId))
// 		},
// 		unfollow: userId => {
// 			dispatch(unfollowUserAC(userId))
// 		},
// 		setUsers: users => {
// 			dispatch(setUsersAC(users))
// 		},
// 		setCurrentPage: pageNumber => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setIsLoading: isLoading => {
// 			dispatch(setIsLoadingAC(isLoading))
// 		}
// 		// setTotalUsersCount: usersCount => {
// 		// 	dispatch(setTotalUsersCountAC(usersCount))
// 		// }
// 	}
// }

//вместо setDispatchTpProps помещаем объект с ссылками на action creators в 'connect'
export default connect(setStateToProps, {
	followUser,
	unfollowUser,
	setUsers,
	setCurrentPage,
	setIsLoading,
	setTotalUsersCount,
	setDisableFetchingButton,
})(UsersContainer)
