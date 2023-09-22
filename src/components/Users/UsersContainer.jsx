import {
	followUserAC,
	setUsersAC,
	unfollowUserAC,
} from '../../react-redux/users-reducer'
import Users from './Users'
import { connect } from 'react-redux'

const setStateToProps = state => {
	return {
		users: state.usersPage.users
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
	}
}

export default connect(setStateToProps, setDispatchTpProps)(Users)
