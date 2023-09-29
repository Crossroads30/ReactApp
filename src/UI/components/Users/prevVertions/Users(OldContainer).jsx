// import {
// 	followUser,
// 	setUsers,
// 	unfollowUser,
// 	setCurrentPage,
// 	setIsLoading,
// 	// setTotalUsersCountAC
// } from '../../react-redux/users-reducer'
// import UsersApiContainer from './UsersApiContainer'
// import { connect } from 'react-redux'

// const setStateToProps = state => {
// 	return {
// 		users: state.usersPage.users,
// 		pageSize: state.usersPage.pageSize,
// 		totalUsersCount: state.usersPage.totalUsersCount,
// 		currentPage: state.usersPage.currentPage,
// 		isLoading: state.usersPage.isLoading,
// 	}
// }

// // const setDispatchTpProps = dispatch => {
// // 	return {
// // 		follow: userId => {
// // 			dispatch(followUserAC(userId))
// // 		},
// // 		unfollow: userId => {
// // 			dispatch(unfollowUserAC(userId))
// // 		},
// // 		setUsers: users => {
// // 			dispatch(setUsersAC(users))
// // 		},
// // 		setCurrentPage: pageNumber => {
// // 			dispatch(setCurrentPageAC(pageNumber))
// // 		},
// // 		setIsLoading: isLoading => {
// // 			dispatch(setIsLoadingAC(isLoading))
// // 		}
// // 		// setTotalUsersCount: usersCount => {
// // 		// 	dispatch(setTotalUsersCountAC(usersCount))
// // 		// }
// // 	}
// // }

// //вместо setDispatchTpProps помещаем объект с ссылками на объекты в 'connect'
// export default connect(setStateToProps, {
// 	followUser,
// 	unfollowUser,
// 	setUsers,
// 	setCurrentPage,
// 	setIsLoading,
// 	// setTotalUsersCount
// })(UsersApiContainer)
