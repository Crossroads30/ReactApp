import { ResultCodesEnum } from '../../../DAL/api/api.ts'
import { profileApi } from '../../../DAL/api/profileApi.ts'
import { FormAction, stopSubmit } from 'redux-form'
import { PhotosType, PostsType, ProfileType } from '../../../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, BaseThunkType, InferActionsTypes } from './react-redux-store'

//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
//!!! так как типизация(ActionTypes) не позволит записать в типы ничего другого кроме тех типов которые указаны в AC, то эти константы с названиями типов можно убрать !!!
// const ADD_POST = 'profile/ADD-POST'
// const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
// const SET_USER_STATUS = 'profile/SET-USER-STATUS'
// const UPDATE_USER_STATUS = 'profile/UPDATE-USER-STATUS'
// const DELETE_POST = 'profile/DELETE-POST'
// const SAVE_USER_PHOTO_SUCCESS = 'SET-USER-PHOTO-SUCCESS'
// const UPDATE_USER_DATA_SUCCESS = 'profile/UPDATE-USER-DATA-SUCCESS'

let initialState = {
	posts: [
		{ id: 1, message: 'Hi!', likes: 12 },
		{ id: 2, message: 'Nice to see you))', likes: 3 },
		{ id: 3, message: 'Grate day!', likes: 6 },
		{ id: 4, message: 'see you tomorrow', likes: 5 },
		{ id: 5, message: 'How are you?', likes: 23 },
		{ id: 6, message: 'Good night!', likes: 18 },
	] as Array<PostsType>,
	userProfile: null as ProfileType | null,
	status: '' as string,
	userDataStatus: '' as string,
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
	switch (action.type) {
		case 'profile/ADD_POST':
			let newPost = {
				id: 7,
				message: action.newPostBody,
				likes: 0,
			}
			return {
				...state,
				posts: [...state.posts, newPost],
			}
		case 'profile/DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(post => post.id != action.postId),
			}
		case 'profile/SET_USER_PROFILE':
			return {
				...state,
				userProfile: action.userProfile,
			}
		case 'profile/SET_USER_STATUS':
			return {
				...state,
				status: action.status,
			}
		case 'profile/UPDATE_USER_STATUS':
			return {
				...state,
				status: action.status,
			}
		case'profile/SAVE_USER_PHOTO_SUCCESS':
			return {
				...state,
				userProfile: { ...state.userProfile, photos: action.userPhoto } as ProfileType, //фотография приходит из api запроса и находится в photos
			}
		case 'profile/UPDATE_USER_DATA_SUCCESS':
			return {
				...state,
				userDataStatus: action.userDataStatus,
			}
		default:
			return state
	}
}

//-------------------------------------------------------------

type ActionTypes = InferActionsTypes<typeof actions>

const actions = {
	addPost: (newPostBody: string) =>
		({
			type: 'profile/ADD_POST',
			newPostBody,
		} as const),
	deletePost: (postId: number) =>
		({
			type: 'profile/DELETE_POST',
			postId,
		} as const),
	setUserProfile: (userProfile: ProfileType | null) =>
		({
			type: 'profile/SET_USER_PROFILE',
			userProfile,
		} as const),
	setUserStatus: (status: string) =>
		({
			type: 'profile/SET_USER_STATUS',
			status,
		} as const),
	updateUserStatus: (status: string) =>
		({
			type: 'profile/UPDATE_USER_STATUS',
			status,
		} as const),
	savePhotoSuccess: (userPhoto: PhotosType) =>
		({
			type: 'profile/SAVE_USER_PHOTO_SUCCESS',
			userPhoto,
		} as const),
	updateUserDataSuccess: (userDataStatus: string) =>
		({
			type: 'profile/UPDATE_USER_DATA_SUCCESS',
			userDataStatus,
		} as const),
}

//

//--------------------------------------------------------
// вместо явной типизации ниже, используем generic BaseThunkType из react-redux-store.ts и передаем в него в качестве параметра - ActionsTypes, остальное приходит по умолчанию
type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>> // передаем так же доп action для stopSubmit и возвращаем типы по (ReturnType<typeof stopSubmit>)
// или другой вариант: BaseThunkType<ActionsTypes | FormAction> т.е. stopSubmit в типизациях redux-form является 'FormAction

// type ThunkType = ThunkAction<Promise<void>,AppStateType, unknown, ActionTypes>

//thunk creators:
export const getUserProfile =
	(profileId: number | null): ThunkType =>
	async dispatch => {
		const userProfileData = await profileApi.getProfile(profileId) // вместо then() используем async await
		// debugger
		dispatch(actions.setUserProfile(userProfileData))
	}

export const getStatus =
	(profileId: number): ThunkType =>
	async dispatch => {
		const status = await profileApi.getStatus(profileId)
		// debugger
		dispatch(actions.setUserStatus(status))
	}

export const updateStatus =
	(status: string): ThunkType =>
	async dispatch => {
		//используем try catch для перехвата ошибок
		try {
			const updateStatusData = await profileApi.updateStatus(status)
			updateStatusData.resultCode === ResultCodesEnum.Success && dispatch(actions.setUserStatus(status))
		} catch (error) {
			console.log(error)
		}
	}

export const savePhoto =
	(file: File): ThunkType =>
	async dispatch => {
		const savePhotoData = await profileApi.savePhoto(file)
		savePhotoData.resultCode === ResultCodesEnum.Success && dispatch(actions.savePhotoSuccess(savePhotoData.data.photos))
	}

// чтобы получить обновленную версию profile после редактирования
// передаем в данный редюсер метод получения глобального стэйта(getState) и обращаемся через него к auth-reducer для получения id залогиненного пользователя, далее обновляем профиль пользователя с помощью  dispatch(getUserProfile(userId)) и передаем в него наш id пользователя
export const saveUserData =
	(profile: ProfileType): ThunkType =>
	async (dispatch, getState) => {
		const userId = getState().auth.id
		const userData = await profileApi.saveUserData(profile)

		if (userData.resultCode === ResultCodesEnum.Success) {
			dispatch(getUserProfile(userId))
		} else {
			//передаем в качестве ошибки сообщение из response.data.messages из api запроса
			dispatch(stopSubmit('edit-profile', { _error: userData.messages }))//для выведения общей ошибки ??? types ????
			// dispatch(stopSubmit('edit-profile', { "contacts":  {"facebook": response.data.messages[0]} }))//для выведения отдельных ошибок по полям но надо распарсить строку из response.data.messages[0]
			return Promise.reject(userData.messages) //после диспатча возвращаем Promise.reject с сообщением об этой ошибки внутри
		}
	}

export default profileReducer

//----- старая версия типизации без generic inferActionTypes -------------

// type ActionTypes =
// 	| AddPostType
// 	| DeletePostType
// 	| SetUserProfileType
// 	| SetUserStatusType
// 	| UpdateUserStatusType
// 	| SavePhotoSuccessType
// 	| UpdateUserDataSuccessType

// //Action Creators with types:
// type AddPostType = {
// 	type: typeof ADD_POST
// 	newPostBody: string
// }
// export const addPost = (newPostBody: string): AddPostType => ({
// 	type: ADD_POST,
// 	newPostBody,
// })

// type DeletePostType = {
// 	type: typeof DELETE_POST
// 	postId: number
// }
// export const deletePost = (postId: number): DeletePostType => ({
// 	type: DELETE_POST,
// 	postId,
// })

// type SetUserProfileType = {
// 	type: typeof SET_USER_PROFILE
// 	userProfile: ProfileType | null
// }
// export const setUserProfile = (userProfile: ProfileType | null): SetUserProfileType => ({
// 	type: SET_USER_PROFILE,
// 	userProfile,
// })

// type SetUserStatusType = {
// 	type: typeof SET_USER_STATUS
// 	status: string
// }
// export const setUserStatus = (status: string): SetUserStatusType => ({
// 	type: SET_USER_STATUS,
// 	status,
// })

// type UpdateUserStatusType = {
// 	type: typeof UPDATE_USER_STATUS
// 	status: string
// }
// export const updateUserStatus = (status: string): UpdateUserStatusType => ({
// 	type: UPDATE_USER_STATUS,
// 	status,
// })

// type SavePhotoSuccessType = {
// 	type: typeof SAVE_USER_PHOTO_SUCCESS
// 	userPhoto: PhotosType
// }
// export const savePhotoSuccess = (userPhoto: PhotosType): SavePhotoSuccessType => ({
// 	type: SAVE_USER_PHOTO_SUCCESS,
// 	userPhoto,
// })

// type UpdateUserDataSuccessType = {
// 	type: typeof UPDATE_USER_DATA_SUCCESS
// 	userDataStatus: string
// }
// export const updateUserDataSuccess = (userDataStatus: string): UpdateUserDataSuccessType => ({
// 	type: UPDATE_USER_DATA_SUCCESS,
// 	userDataStatus,
// })
