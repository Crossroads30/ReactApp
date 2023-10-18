import { profileApi } from '../../../DAL/api/api'

//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE'
const SET_USER_STATUS = 'profile/SET-USER-STATUS'
const UPDATE_USER_STATUS = 'profile/UPDATE-USER-STATUS'
const DELETE_POST = 'profile/DELETE-POST'
const SAVE_USER_PHOTO_SUCCESS = 'SET-USER-PHOTO-SUCCESS'

let initialState = {
	posts: [
		{ id: 1, message: 'Hi!', likes: 12 },
		{ id: 2, message: 'Nice to see you))', likes: 3 },
		{ id: 3, message: 'Grate day!', likes: 6 },
		{ id: 4, message: 'see you tomorrow', likes: 5 },
		{ id: 5, message: 'How are you?', likes: 23 },
		{ id: 6, message: 'Good night!', likes: 18 },
	],
	userProfile: null,
	status: '',
}

const profileReducer = (state = initialState, action) => {
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
				userProfile: { ...state.userProfile, photos: action.userPhoto },//фотография приходит из api запроса и находится в photos 
			}
		default:
			return state
	}
}

//-------------------------------------------------------------
//Action Creators
export const addPost = newPostBody => ({
	type: ADD_POST,
	newPostBody,
})
export const deletePost = postId => ({
	type: DELETE_POST,
	postId,
})
export const setUserProfile = userProfile => ({
	type: SET_USER_PROFILE,
	userProfile,
})
export const setUserStatus = status => ({
	type: SET_USER_STATUS,
	status,
})
export const updateUserStatus = status => ({
	type: UPDATE_USER_STATUS,
	status,
})
export const savePhotoSuccess = userPhoto => ({
	type: SAVE_USER_PHOTO_SUCCESS,
	userPhoto,
})



//--------------------------------------------------------
//thunk creators:
export const getUserProfile = profileId => async dispatch => {
		const response = await profileApi.getProfile(profileId) // вместо then() используем async await
		// debugger
		dispatch(setUserProfile(response.data))
	}


export const getStatus = profileId => async dispatch => {
	const response = await profileApi.getStatus(profileId)
		// debugger
		dispatch(setUserStatus(response.data))
	}

	export const updateStatus = status => async dispatch => {
		const response = await profileApi.updateStatus(status)
		response.data.resultCode === 0 && dispatch(setUserStatus(status))
	}

	export const savePhoto = file => async dispatch => {
		const response = await profileApi.savePhoto(file)
		response.data.resultCode === 0 && dispatch(savePhotoSuccess(response.data.data.photos))
	}

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
