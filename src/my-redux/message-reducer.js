const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

let initialState = {
	dialogs: [
		{ id: 1, name: 'Max' },
		{ id: 2, name: 'Mick' },
		{ id: 3, name: 'Jack' },
		{ id: 4, name: 'John' },
		{ id: 5, name: 'Paul' },
		{ id: 6, name: 'Ken' },
	],
	messages: [
		{ id: 1, message: 'Hi!' },
		{ id: 2, message: 'Nice to see you))' },
		{ id: 3, message: 'Grate day!' },
		{ id: 4, message: 'see you tomorrow' },
		{ id: 5, message: 'How are you?' },
		{ id: 6, message: 'Good night!' },
	],
	newMessageText: '',
}

const messageReducer = (state = initialState, action) => {
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
