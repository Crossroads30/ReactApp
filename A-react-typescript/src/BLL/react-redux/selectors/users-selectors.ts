import { createSelector } from 'reselect'
import { AppStateType } from '../reducers/react-redux-store'

export const getAllUsers = (state: AppStateType) => {
	// передаем AppStateType из react-redux-store
	//простой селектор без библиотеки reselect
	return state.usersPage.users
}
//--------------в качестве примера-----------------------------------------------
// export const getAllUsersSelector = state => {
// 	//сложный( который производит дополнительные действия со state методом filter) селектор использует простой селектор(getAllUsers) без библиотеки reselect
// 	return getAllUsers(state).filter(u => true)
// }

// export const getAllUsersSuperSelector1 = createSelector(getAllUsers, users => {
// 	//сложный селектор созданный при помощи библиотеки reselect - берет в качестве первого параметра простой селектор чтобы получить из него значения(передаются вторым параметром) и использовать их производя с ними какие-либо действия внутри
// 	return users.filter(u => true)
// })
// export const getAllUsersSuperSelector2 = createSelector(
// 	getAllUsers,
// 	getIsLoading,
// 	(users, isLoading) => {
// 		//сложный селектор созданный при помощи библиотеки reselect может принимать сразу несколько простых селекторов чтобы получить из них значения(передаются после самих селекторов) и использовать их производя с ними какие-либо действия внутри
// 		return users.filter(u => true)
// 	}
// )
//------------------------------------------------------------------------------
export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
	return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage
}
export const getIsLoading = (state: AppStateType) => {
	return state.usersPage.isLoading
}
export const getFollowingInProgress = (state: AppStateType) => {
	return state.usersPage.followingInProgress
}
