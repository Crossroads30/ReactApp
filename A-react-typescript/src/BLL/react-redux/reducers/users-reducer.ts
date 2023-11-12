import { userApi } from '../../../DAL/api/api'
import { UserType } from '../../../types/types'
import { updateObjectInArray } from '../../../utils/helpers/object-helpers'

//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
const SET_USERS = 'users/SET-USERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const TOGGLE_IS_LOADING = 'users/TOGGLE-IS-LOADING'
const SET_USERS_COUNT = 'users/SET-USERS-COUNT'
const DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS = 'users/DISABLE-FETCHING-BUTTON'

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 5 as number,
	totalUsersCount: 500 as number,
	currentPage: 1 as number,
	isLoading: true as boolean,
	followingInProgress: [] as Array<number>,// array of users ids
}

export type InitialStateType = typeof initialState

const UsersReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case FOLLOW:
			return {
				...state,
				//если внутри массива не надо что либо менять:
				// users: [...state.users],
				//если внутри массива надо изменить какие-либо объекты:
				//вместо закомментированного кода ниже импортируем шаблонную функцию helper и передаем в нее все нужные параметры:
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: true,
				}),
				// users: state.users.map(user => {
				// 	if (user.id === action.userId) {
				// 		return { ...user, followed: true }
				// 	}
				// 	return user
				// }),
			}
		case UNFOLLOW:
			return {
				...state,
				//если внутри массива не надо что либо менять:
				// // users: [...state.users],
				//если внутри массива надо изменить какие-либо объекты:
				//вместо закомментированного кода ниже импортируем шаблонную функцию helper и передаем в нее все нужные параметры:
				users: updateObjectInArray(state.users, action.userId, 'id', {
					followed: false,
				}),
				// users: state.users.map(user => {
				// 	if (user.id === action.userId) {
				// 		return { ...user, followed: false }
				// 	}
				// 	return user
				// }),
			}
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			}
		case TOGGLE_IS_LOADING:
			return {
				...state,
				isLoading: action.isLoading,
			}
		case SET_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.count,
			}
		case DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isLoading
					? [...state.followingInProgress, action.userId]
					: [state.followingInProgress.filter(id => id != action.userId)],
			}
		default:
			return state
	}
}

//функции Action Creators with types:
type SetUsersType = {
	type: typeof SET_USERS
	users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users })

type FollowUserType = {
	type: typeof FOLLOW
	userId: number
}
export const followUser = (userId: number): FollowUserType => ({ type: FOLLOW, userId })

type UnfollowUserType = {
	type: typeof UNFOLLOW
	userId: number
}
export const unfollowUser = (userId: number): UnfollowUserType => ({ type: UNFOLLOW, userId })

type SetCurrentPageType = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
	type: SET_CURRENT_PAGE,
	currentPage,
})

type SetIsLoadingType = {
	type: typeof TOGGLE_IS_LOADING
	isLoading: boolean
}
export const setIsLoading = (isLoading: boolean): SetIsLoadingType => ({
	type: TOGGLE_IS_LOADING,
	isLoading,
})

type SetTotalUsersCountType = {
	type: typeof SET_USERS_COUNT
	count: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountType => ({
	type: SET_USERS_COUNT,
	count,
})

type SetDisableFetchingButtonType = {
	type: typeof DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS
	isLoading: boolean
	userId: number
}
export const setDisableFetchingButton = (isLoading: boolean, userId: number): SetDisableFetchingButtonType => ({
	type: DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS,
	isLoading,
	userId,
})

//thunk функции:

//ThunkCreator getUsers:
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
	//берем параметры с помощью замыкания в thunkCreator и возвращаем из нее thunk функцию с диспатчем, в которую приходят эти параметры:
	dispatch(setIsLoading(true)) //диспатчем actionCreator
	const data = await userApi.getUsers(currentPage, pageSize)
	// data - то что пришло из ajax-запроса в DAL/api/api.js
	dispatch(setCurrentPage(currentPage)) //диспатчем actionCreator
	dispatch(setIsLoading(false)) //диспатчем actionCreator
	dispatch(setUsers(data)) //диспатчем actionCreator
}

//общая функция для follow/unfollow
const followUnfollowFlow = async (
	//код с одной общей функцией для follow/unfollow для избежания дублирования кода
	dispatch: any,
	userId: number,
	apiMethod: any,
	actionCreator: any
) => {
	dispatch(setDisableFetchingButton(true, userId))
	let data = await apiMethod(userId)

	data.resultCode === 0 && dispatch(actionCreator(userId))
	dispatch(setDisableFetchingButton(false, userId))
}

//ThunkCreator follow:
export const follow = (userId: number) => async (dispatch: any) => {
	followUnfollowFlow(
		//с помощью диструктуризации передаем параметры в followUnfollowFlow
		dispatch,
		userId,
		userApi.getFollow.bind(userId),
		followUser
	)
}

//ThunkCreator unfollow:
export const unfollow = (userId: number)=> async (dispatch: any) => {
	followUnfollowFlow(
		//с помощью диструктуризации передаем параметры в followUnfollowFlow
		dispatch,
		userId,
		userApi.getUnFollow.bind(userId),
		unfollowUser
	)
}

//код для follow/unfollow без общей функции
// //ThunkCreator follow:
// export const follow = userId => async dispatch => {
// 	dispatch(setDisableFetchingButton(true, userId)) // передаем id пользователя кнопку которого надо сделать неактивной во время запроса на подписку
// 	const data = await userApi.getFollow(userId)
// 	data.resultCode === 0 && dispatch(followUser(userId))
// 	dispatch(setDisableFetchingButton(false, userId)) // // передаем id пользователя кнопку которого надо вернуть в активное состояние после того как запрос на подписку закончится
// }

// //ThunkCreator unfollow:
// export const unfollow = userId => async dispatch => {
// 	dispatch(setDisableFetchingButton(true, userId)) // передаем id пользователя кнопку которого надо сделать неактивной во время запроса на отписку
// 	const data = userApi.getUnFollow(userId)
// 	data.resultCode === 0 && dispatch(unfollowUser(userId))
// 	dispatch(setDisableFetchingButton(false, userId)) // // передаем id пользователя кнопку которого надо вернуть в активное состояние после того как запрос на отписку закончится
// }

export default UsersReducer
