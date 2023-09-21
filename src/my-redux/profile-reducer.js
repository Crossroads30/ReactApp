const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

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
		}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 7,
				message: state.newPostText,
				likes: 0,
			}
			state.posts.push(newPost)
			state.newPostText = ''
			return state
		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.newText
			return state
		default:
			return state
	}

	// if (action.type === ADD_POST) {
	// 	let newPost = {
	// 		id: 7,
	// 		message: state.newPostText,
	// 		likes: 0,
	// 	}
	// 	state.posts.push(newPost)
	// 	state.newPostText = ''
	// } else if (action.type === UPDATE_NEW_POST_TEXT) {
	// 	state.newPostText = action.newText
	// }

	// return state
}

export const addPostActionCreator = () => ({ type: ADD_POST }) 
export const updateNewPostActionCreator = text => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
})

export default profileReducer
