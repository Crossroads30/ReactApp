import { userApi } from '../../../DAL/api/api'

//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
const SET_USERS = 'users/SET-USERS'
const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE'
const TOGGLE_IS_LOADING = 'users/TOGGLE-IS-LOADING'
const SET_USERS_COUNT = 'users/SET-USERS-COUNT'
const DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS = 'users/DISABLE-FETCHING-BUTTON'

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 50,
	currentPage: 1,
	isLoading: true,
	followingInProgress: [],
}

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case FOLLOW:
			return {
				...state,
				// users: [...state.users], //если внутри массива не надо что либо менять
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: true }
					}
					return user
				}), //если внутри массива надо изменить какие-либо объекты
			}
		case UNFOLLOW:
			return {
				...state,
				// users: [...state.users], //если внутри массива не надо что либо менять
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: false }
					}
					return user
				}), //если внутри массива надо изменить какие-либо объекты
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

//функции Action Creators:
export const setUsers = users => ({ type: SET_USERS, users })
export const followUser = userId => ({ type: FOLLOW, userId })
export const unfollowUser = userId => ({ type: UNFOLLOW, userId })
export const setCurrentPage = currentPage => ({
	type: SET_CURRENT_PAGE,
	currentPage,
})
export const setIsLoading = isLoading => ({
	type: TOGGLE_IS_LOADING,
	isLoading,
})
export const setTotalUsersCount = totalUsersCount => ({
	type: SET_USERS_COUNT,
	count: totalUsersCount,
})
export const setDisableFetchingButton = (isLoading, userId) => ({
	type: DISABLE_BUTTON_WHILE_FOLLOWING_IN_PROGRESS,
	isLoading,
	userId,
})

//thunk функции:

//ThunkCreator getUsers:
export const getUsers = (currentPage, pageSize) => {
	//берем параметры с помощью замыкания в thunkCreator и возвращаем из нее thunk функцию с диспатчем, в которую приходят эти параметры:
	return dispatch => {
		dispatch(setIsLoading(true)) //диспатчем actionCreator

		userApi.getUsers(currentPage, pageSize).then(data => {
			// data - то что пришло из ajax-запроса в DAL/api/api.js
			dispatch(setCurrentPage(currentPage)) //диспатчем actionCreator
			dispatch(setIsLoading(false)) //диспатчем actionCreator
			dispatch(setUsers(data)) //диспатчем actionCreator
		})
	}
}

//ThunkCreator follow:
export const follow = userId => {
	return dispatch => {
		dispatch(setDisableFetchingButton(true, userId)) // передаем id пользователя кнопку которого надо сделать неактивной во время запроса на подписку
		userApi.getFollow(userId).then(data => {
			data.resultCode === 0 && dispatch(followUser(userId))
			dispatch(setDisableFetchingButton(false, userId)) // // передаем id пользователя кнопку которого надо вернуть в активное состояние после того как запрос на подписку закончится
		})
	}
}

//ThunkCreator unfollow:
export const unfollow = userId => {
	return dispatch => {
		dispatch(setDisableFetchingButton(true, userId)) // передаем id пользователя кнопку которого надо сделать неактивной во время запроса на отписку
		userApi.getUnFollow(userId).then(data => {
			data.resultCode === 0 && dispatch(unfollowUser(userId))
			dispatch(setDisableFetchingButton(false, userId)) // // передаем id пользователя кнопку которого надо вернуть в активное состояние после того как запрос на отписку закончится
		})
	}
}

export default UsersReducer
