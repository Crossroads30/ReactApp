import { Dispatch } from 'redux'
import {  userApi } from '../../../DAL/api/userApi.ts'
import { ResultCodesEnum } from '../../../DAL/api/api.ts'
import { UserType } from '../../../types/types'
import { updateObjectInArray } from '../../../utils/helpers/object-helpers'
import { BaseThunkType, InferActionsTypes } from './react-redux-store'


//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
//!!! так как типизация(ActionTypes) не позволит записать в типы ничего другого кроме тех типов которые указаны в AC, то эти константы с названиями типов можно убрать !!! 
// const SET_USERS = 'users/SET-USERS'
// const FOLLOW = 'users/FOLLOW'
// const UNFOLLOW = 'users/UNFOLLOW'
// const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
// const TOGGLE_IS_LOADING = 'users/TOGGLE-IS-LOADING'
// const SET_USERS_COUNT = 'users/SET-USERS-COUNT'
// const DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS = 'users/DISABLE-FETCHING-BUTTON'

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 5 as number,
	totalUsersCount: 500 as number,
	currentPage: 1 as number,
	isLoading: true as boolean,
	followingInProgress: [] as Array<number> | any, // array of users ids
}

export type InitialStateType = typeof initialState

const UsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'users/SET-USERS':
			return {
				...state,
				users: action.users,
			}
		case 'users/FOLLOW':
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
		case 'users/UNFOLLOW':
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
		case 'users/SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage,
			}
		case 'users/TOGGLE_IS_LOADING':
			return {
				...state,
				isLoading: action.isLoading,
			}
		case 'users/SET_USERS_COUNT':
			return {
				...state,
				totalUsersCount: action.count,
			}
		case 'users/DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS':
			return {
				...state,
				followingInProgress: action.isLoading
					? [...state.followingInProgress, action.userId]
					: [state.followingInProgress.filter((id: number) => id != action.userId)],
			}
		default:
			return state
	}
}



//функции Action Creators with types:

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	setUsers: (users: Array<UserType>) => ({ type: 'users/SET-USERS', users } as const),
	followUser: (userId: number) => ({ type: 'users/FOLLOW', userId } as const),
	unfollowUser: (userId: number) => ({ type: 'users/UNFOLLOW', userId } as const),
	setCurrentPage: (currentPage: number) => ({ type: 'users/SET_CURRENT_PAGE', currentPage } as const),
	setIsLoading: (isLoading: boolean) => ({ type: 'users/TOGGLE_IS_LOADING', isLoading } as const),
	setTotalUsersCount: (count: number) => ({ type: 'users/SET_USERS_COUNT', count } as const),
	setDisableFetchingButton: (isLoading: boolean, userId: number) =>
		({ type: 'users/DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS', isLoading, userId } as const), // as const говорит что кроме тех значений которые записаны а AC ничего другого приходить не должно!!!
}


//thunk функции:

//ThunkCreator getUsers:
// export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionTypes>, getState: AppStateType) => { // первый вариант типизации thunk!!!!

// второй вариант типизации thunk
// type GetStateType = () => AppStateType
// type DispatchType = Dispatch<ActionTypes>

// export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => { // второй вариант типизации thunk!!!!

// третий вариант типизации thunk!!!!
// вместо явной типизации ниже, используем generic BaseThunkType из react-redux-store.ts и передаем в него в качестве параметра - ActionsTypes, остальное приходит по умолчанию
type ThunkType = BaseThunkType<ActionsTypes>

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers =
	(currentPage: number, pageSize: number): ThunkType =>
	async (dispatch, getState) => {
		// если нужно, так же можно вызывать и getState
		// третий вариант типизации thunk
		//берем параметры с помощью замыкания в thunkCreator и возвращаем из нее thunk функцию с диспатчем, в которую приходят эти параметры:
		dispatch(actions.setIsLoading(true)) //диспатчем actionCreator
		const data = await userApi.getUsers(currentPage, pageSize)
		// data - то что пришло из ajax-запроса в DAL/api/api.js
		dispatch(actions.setCurrentPage(currentPage)) //диспатчем actionCreator
		dispatch(actions.setIsLoading(false)) //диспатчем actionCreator
		dispatch(actions.setUsers(data)) //диспатчем actionCreator
	}

//общая функция для follow/unfollow
const _followUnfollowFlow = async (
	//код с одной общей функцией для follow/unfollow для избежания дублирования кода
	dispatch: Dispatch<ActionsTypes>, // типизация для общей функции _followUnfollowFlow
	userId: number,
	apiMethod: any,
	actionCreator: (userId: number) => ActionsTypes
) => {
	dispatch(actions.setDisableFetchingButton(true, userId))
	let data = await apiMethod(userId)

	data.resultCode === ResultCodesEnum.Success && dispatch(actionCreator(userId))
	dispatch(actions.setDisableFetchingButton(false, userId))
}

//ThunkCreator follow:
export const follow = (userId: number): ThunkType => async (dispatch) => {
	_followUnfollowFlow(
		//с помощью диструктуризации передаем параметры в _followUnfollowFlow
		dispatch,
		userId,
		userApi.getFollow.bind(userId),
		actions.followUser
	)
}

//ThunkCreator unfollow:
export const unfollow =
	(userId: number): ThunkType =>
	async (dispatch) => {
		_followUnfollowFlow(
			//с помощью диструктуризации передаем параметры в _followUnfollowFlow
			dispatch,
			userId,
			userApi.getUnFollow.bind(userId),
			actions.unfollowUser
		)
	}

	export default UsersReducer

//-----------------------------------

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

//старая версия типизации action creators:

// type ActionTypes =
// 	| SetUsersType
// 	| FollowUserType
// 	| UnfollowUserType
// 	| SetCurrentPageType
// 	| SetIsLoadingType
// 	| SetTotalUsersCountType
// 	| SetDisableFetchingButtonType

// type SetUsersType = {
// 	type: typeof SET_USERS
// 	users: Array<UserType>
// }
// export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users })
// type FollowUserType = {
// 	type: typeof FOLLOW
// 	userId: number
// }
// export const followUser = (userId: number): FollowUserType => ({ type: FOLLOW, userId })
// type UnfollowUserType = {
// 	type: typeof UNFOLLOW
// 	userId: number
// }
// export const unfollowUser = (userId: number): UnfollowUserType => ({ type: UNFOLLOW, userId })
// type SetCurrentPageType = {
// 	type: typeof SET_CURRENT_PAGE
// 	currentPage: number
// }
// export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
// 	type: SET_CURRENT_PAGE,
// 	currentPage,
// })
// type SetIsLoadingType = {
// 	type: typeof TOGGLE_IS_LOADING
// 	isLoading: boolean
// }
// export const setIsLoading = (isLoading: boolean): SetIsLoadingType => ({
// 	type: TOGGLE_IS_LOADING,
// 	isLoading,
// })
// type SetTotalUsersCountType = {
// 	type: typeof SET_USERS_COUNT
// 	count: number
// }
// export const setTotalUsersCount = (count: number): SetTotalUsersCountType => ({
// 	type: SET_USERS_COUNT,
// 	count,
// })
// type SetDisableFetchingButtonType = {
// 	type: typeof DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS
// 	isLoading: boolean
// 	userId: number
// }
// export const setDisableFetchingButton = (isLoading: boolean, userId: number, ): SetDisableFetchingButtonType => ({
// 	type: DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS,
// 	isLoading,
// 	userId,
// })


