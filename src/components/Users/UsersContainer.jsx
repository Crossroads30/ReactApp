import axios from 'axios'
import React from 'react'
import Users from './Users'

import {
	followUser,
	setUsers,
	unfollowUser,
	setCurrentPage,
	setIsLoading,
	setTotalUsersCount,
} from '../../react-redux/users-reducer'
import { connect } from 'react-redux'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.setIsLoading(true)
		axios.create({
			withCredentials: true,
			baseURL: 'https://social-network.samuraijs.com/api/1.0/',
			headers: {
				'API-KEY': '3f7ad031-df1b-42ff-b2a2-b96c84e80631',
			},
		})

		axios
			.get(
				// `http://localhost:3000/items/?_limit=${this.props.pageSize}&_page=${this.props.currentPage}`
				`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
			)
			.then(response => {
				this.props.setIsLoading(false)
				this.props.setUsers(response.data.items)
				// this.props.setTotalUsersCount(response.data.totalCount)
			})
	}

	onPageChange = pageNumber => {
		//!!!!обратить внимание что этот синтаксис этого метода - стрелочная функция!!!!
		this.props.setCurrentPage(pageNumber)
		this.props.setIsLoading(true)
		axios
			.get(
				// `http://localhost:3000/items?_limit=${this.props.pageSize}&_page=${pageNumber}`
				`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`
			)
			.then(response => {
				this.props.setUsers(response.data.items)
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
					unfollow={this.props.unfollow}
					follow={this.props.follow}
					isLoading={this.props.isLoading}
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

//вместо setDispatchTpProps помещаем объект с ссылками на объекты в 'connect'
export default connect(setStateToProps, {
	followUser,
	unfollowUser,
	setUsers,
	setCurrentPage,
	setIsLoading,
	setTotalUsersCount
})(UsersContainer)
