import React from 'react'
import Users from './Users'
import {
	followUser,
	unfollowUser,
	setCurrentPage,
	setTotalUsersCount,
	getUsers,
} from '../../../BLL/react-redux/users-reducer'
import { connect } from 'react-redux'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize)//этот колбэк(getUsers) передает эти параметры в thunkCreator
	}

	onPageChange = pageNumber => {
		//!!!!обратить внимание что этот синтаксис этого метода - стрелочная функция!!!!
		this.props.getUsers(pageNumber, this.props.pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator getUsers
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

// сокращенный вариант записи:
//вместо setDispatchTpProps помещаем объект с ссылками на action creators в 'connect' и возвращаем именно callback не 'creators'(это просто сокращенный синтаксис того что написано выше в 'setDispatchTpProps') 
export default connect(setStateToProps, {
	followUser,
	unfollowUser,
	setCurrentPage,
	setTotalUsersCount,
	getUsers,
})(UsersContainer)
