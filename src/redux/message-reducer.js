const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const messageReducer = (state, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: 7,
				message: state.newMessageText,
			}
			state.messages.push(newMessage)
			state.newMessageText = ''
			return state
		case UPDATE_NEW_MESSAGE:
			state.newMessageText = action.newMessage
			return state
		default:
			return state
	}
	// if (action.type === ADD_MESSAGE) {
	// 	let newMessage = {
	// 		id: 7,
	// 		message: state.newMessageText,
	// 	}
	// 	state.messages.push(newMessage)
	// 	state.newMessageText = ''
	// } else if (action.type === UPDATE_NEW_MESSAGE) {
	// 	state.newMessageText = action.newMessage
	// }

	// return state
}

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })
export const updateNewMessageActionCreator = message => ({
	type: UPDATE_NEW_MESSAGE,
	newMessage: message,
})

export default messageReducer
