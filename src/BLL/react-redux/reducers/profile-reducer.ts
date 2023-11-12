import { profileApi } from '../../../DAL/api/api'
import { stopSubmit } from 'redux-form'
import { PhotosType, PostsType, ProfileType } from '../../../types/types'

//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_USER_STATUS = 'profile/SET-USER-STATUS'
const UPDATE_USER_STATUS = 'profile/UPDATE-USER-STATUS'
const DELETE_POST = 'profile/DELETE-POST'
const SAVE_USER_PHOTO_SUCCESS = 'SET-USER-PHOTO-SUCCESS'
const UPDATE_USER_DATA_SUCCESS = 'profile/UPDATE-USER-DATA-SUCCESS'

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

const profileReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 7,
				message: action.newPostBody,
				likes: 0,
			}
			return {
				...state,
				posts: [...state.posts, newPost],
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id != action.postId),
			}
		case SET_USER_PROFILE:
			return {
				...state,
				userProfile: action.userProfile,
			}
		case SET_USER_STATUS:
			return {
				...state,
				status: action.status,
			}
		case UPDATE_USER_STATUS:
			return {
				...state,
				status: action.status,
			}
		case SAVE_USER_PHOTO_SUCCESS:
			return {
				...state,
				userProfile: { ...state.userProfile, photos: action.userPhoto } as ProfileType, //фотография приходит из api запроса и находится в photos
			}
		case UPDATE_USER_DATA_SUCCESS:
			return {
				...state,
				userDataStatus: action.userDataStatus,
			}
		default:
			return state
	}
}

//-------------------------------------------------------------

//Action Creators with types:
type AddPostType = {
	type: typeof ADD_POST
	newPostBody: PostsType
}
export const addPost = (newPostBody: PostsType): AddPostType => ({
	type: ADD_POST,
	newPostBody,
})

type DeletePostType = {
	type: typeof DELETE_POST
	postId: number
}
export const deletePost = (postId: number): DeletePostType => ({
	type: DELETE_POST,
	postId,
})

type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	userProfile: ProfileType | null
}
export const setUserProfile = (userProfile: ProfileType | null): SetUserProfileType => ({
	type: SET_USER_PROFILE,
	userProfile,
})

type SetUserStatusType = {
	type: typeof SET_USER_STATUS
	status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({
	type: SET_USER_STATUS,
	status,
})

type UpdateUserStatusType = {
	type: typeof UPDATE_USER_STATUS
	status: string
}
export const updateUserStatus = (status: string): UpdateUserStatusType => ({
	type: UPDATE_USER_STATUS,
	status,
})

type SavePhotoSuccessType = {
	type: typeof SAVE_USER_PHOTO_SUCCESS
	userPhoto: PhotosType
}
export const savePhotoSuccess = (userPhoto: PhotosType): SavePhotoSuccessType => ({
	type: SAVE_USER_PHOTO_SUCCESS,
	userPhoto,
})

type UpdateUserDataSuccessType = {
	type: typeof UPDATE_USER_DATA_SUCCESS
	userDataStatus: string
}
export const updateUserDataSuccess = (userDataStatus: string): UpdateUserDataSuccessType => ({
	type: UPDATE_USER_DATA_SUCCESS,
	userDataStatus,
})

//--------------------------------------------------------
//thunk creators:
export const getUserProfile = (profileId: number) => async (dispatch: any) => {
	const response = await profileApi.getProfile(profileId) // вместо then() используем async await
	// debugger
	dispatch(setUserProfile(response.data))
}

export const getStatus = (profileId: number) => async (dispatch: any) => {
	const response = await profileApi.getStatus(profileId)
	// debugger
	dispatch(setUserStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
	//используем try catch для перехвата ошибок
	try {
		const response = await profileApi.updateStatus(status)
		response.data.resultCode === 0 && dispatch(setUserStatus(status))
	} catch (error) {
		console.log(error)
	}
}

export const savePhoto = (file: any) => async (dispatch: any) => {
	const response = await profileApi.savePhoto(file)
	response.data.resultCode === 0 && dispatch(savePhotoSuccess(response.data.data.photos))
}

// чтобы получить обновленную версию profile после редактирования
// передаем в данный редюсер метод получения глобального стэйта(getState) и обращаемся через него к auth-reducer для получения id залогиненного пользователя, далее обновляем профиль пользователя с помощью  dispatch(getUserProfile(userId)) и передаем в него наш id пользователя
export const saveUserData = (profile: ProfileType) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.id
	const response = await profileApi.saveUserData(profile)
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId))
	} else {
		//передаем в качестве ошибки сообщение из response.data.messages из api запроса
		dispatch(stopSubmit('edit-profile', { _error: response.data.messages })) //для выведения общей ошибки
		// dispatch(stopSubmit('edit-profile', { "contacts":  {"facebook": response.data.messages[0]} }))//для выведения отдельных ошибок по полям но надо распарсить строку из response.data.messages[0]
		return Promise.reject(response.data.messages) //после диспатча возвращаем Promise.reject с сообщением об этой ошибки внутри
	}
	// }
	// export const saveUserData = profile => async (dispatch, getState) => {
	// 	const userId = getState().auth.id
	// 	const response = await profileApi.saveUserData(profile)
	// 	console.log(response.data.messages)
	// 	if (response.data.resultCode === 0) {
	// 		dispatch(getUserProfile(userId))
	// 		dispatch(updateUserDataSuccess('success'))
	// 	} else {
	// 		const fieldName = response.data.messages[0]
	// 			.replace(/[^a-zA-Z0-9-'-' ]/g, '')
	// 			.split('-')
	// 			.slice(-1)
	// 			.toString()
	// 		const fieldNameLower = fieldName.charAt(0).toLowerCase() + fieldName.slice(1)

	// 		//передаем в качестве ошибки сообщение из response.data.messages из api запроса
	// 		dispatch(
	// 			//что бы переменная была видна внутри {}, помещаем ее внутрь []
	// 			stopSubmit('edit-profile', {
	// 				contacts: { [fieldNameLower]: response.data.messages[0].split('(').slice(0, 1) },
	// 			})
	// 		)
	// 		// dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }))
	// 		dispatch(updateUserDataSuccess('error'))
	// 	}

	//второй вариант выведения ошибки:
	// if (response.data.resultCode === 0){
	//       dispatch(getUserProfile(userId));
	//   }
	//   else {
	//       let result = [];
	//         for (let i=0; response.data.messages.length > i; i++) {
	//             result.push(response.data.messages[i])
	//         }
	//       dispatch(stopSubmit("edit-profile", {_error: result }));
	//       return Promise.reject(result);
	//   }
}

//----------------------------------------------------------------
// export const updateStatus = status => { // санка с then()
// 	return dispatch => {
// 		profileApi.updateStatus(status).then(response => {
// 			response.data.resultCode === 0 && dispatch(setUserStatus(status))
// 		})
// 	}
// }

export default profileReducer

//старая версия кода
// const profileReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case ADD_POST: {
// 			let newPost = {
// 				id: 7,
// 				message: state.newPostText,
// 				likes: 0,
// 			}
// 			let stateCopy = { ...state }
// 			stateCopy.posts = [...state.posts]
// 			stateCopy.posts.push(newPost)
// 			stateCopy.newPostText = ''
// 			return stateCopy
// 		}
// 		case UPDATE_NEW_POST_TEXT: {
// 			let stateCopy = { ...state }

// 			stateCopy.newPostText = action.newText
// 			return stateCopy
// 		}
// 		default:
// 			return state
// 	}
// }
