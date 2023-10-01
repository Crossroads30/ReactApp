import { userApi } from '../../DAL/api/api'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'

let initialState = {
	posts: [
		{ id: 1, message: 'Hi!', likes: 12 },
		{ id: 2, message: 'Nice to see you))', likes: 3 },
		{ id: 3, message: 'Grate day!', likes: 6 },
		{ id: 4, message: 'see you tomorrow', likes: 5 },
		{ id: 5, message: 'How are you?', likes: 23 },
		{ id: 6, message: 'Good night!', likes: 18 },
	],
	newPostText: '',
	userProfile: null,
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 7,
				message: state.newPostText,
				likes: 0,
			}
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: '',
			}
		case UPDATE_NEW_POST_TEXT:
			return {
				...state,
				newPostText: action.newText,
			}
		case SET_USER_PROFILE:
			return {
				...state,
				userProfile: action.userProfile,
			}
		default:
			return state
	}
}

//Action Creators
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostActionCreator = newText => ({
	type: UPDATE_NEW_POST_TEXT,
	newText,
})
export const setUserProfile = userProfile => ({
	type: SET_USER_PROFILE,
	userProfile,
})

//thunk creators:
export const getUserProfile = profileId => {
	return dispatch => {
		userApi.getProfile(profileId).then(response => {
			dispatch(setUserProfile(response.data))
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
