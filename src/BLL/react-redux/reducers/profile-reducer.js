import { profileApi } from '../../../DAL/api/api'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'
const UPDATE_USER_STATUS = 'UPDATE-USER-STATUS'

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

//--------------------------------------------------------
//thunk creators:
export const getUserProfile = profileId => {
	return dispatch => {
		profileApi.getProfile(profileId).then(response => {
			// debugger
			dispatch(setUserProfile(response.data))
		})
	}
}
export const getStatus = profileId => {
	return dispatch => {
		profileApi.getStatus(profileId).then(response => {
			// debugger
			dispatch(setUserStatus(response.data))
		})
	}
}
export const updateStatus = status => {
	return dispatch => {
		profileApi.updateStatus(status).then(response => {
			response.data.resultCode === 0 && dispatch(setUserStatus(status))
		})
	}
}

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
