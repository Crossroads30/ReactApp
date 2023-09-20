const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const messageReducer = (state, action) => {
	if (action.type === ADD_MESSAGE) {
		let newMessage = {
			id: 7,
			message: state.newMessageText,
		}
		state.messages.push(newMessage)
		state.newMessageText = ''
	} else if (action.type === UPDATE_NEW_MESSAGE) {
		state.newMessageText = action.newMessage
	}

	return state
}

export default messageReducer
