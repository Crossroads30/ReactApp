import {
	followUserAC,
	setUsersAC,
	unfollowUserAC,
	setCurrentPageAC,
	// setTotalUsersCountAC
} from '../../react-redux/users-reducer'
import Users from './UsersClass'
import { connect } from 'react-redux'

const setStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
	}
}

const setDispatchTpProps = dispatch => {
	return {
		follow: userId => {
			dispatch(followUserAC(userId))
		},
		unfollow: userId => {
			dispatch(unfollowUserAC(userId))
		},
		setUsers: users => {
			dispatch(setUsersAC(users))
		},
		setCurrentPage: pageNumber => {
			dispatch(setCurrentPageAC(pageNumber))
		},
		// setTotalUsersCount: usersCount => {
		// 	dispatch(setTotalUsersCountAC(usersCount))
		// }
	}
}

export default connect(setStateToProps, setDispatchTpProps)(Users)
