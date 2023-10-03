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

//улучшены вариант кода
const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: 7,
				message: state.newMessageText,
			}
			return {
				...state,
				newMessageText: '',
				messages: [...state.messages, newMessage],
			}
		case UPDATE_NEW_MESSAGE:
			return {
				...state,
				newMessageText: action.newMessage,
			}
		default:
			return state
	}
}

//action creators:
export const addMessage = () => ({ type: ADD_MESSAGE })
export const updateNewMessage = message => ({
	type: UPDATE_NEW_MESSAGE,
	newMessage: message,
})

export default messageReducer

//старый вариант кода
// const messageReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case ADD_MESSAGE: {
// 			let newMessage = {
// 				id: 7,
// 				message: state.newMessageText,
// 			}
// 			let stateCopy = {
// 				...state,
// 				messages: [...state.messages],
// 			}
// 			stateCopy.messages.push(newMessage)
// 			stateCopy.newMessageText = ''
// 			return stateCopy
// 		}

// 		case UPDATE_NEW_MESSAGE: {
// 			let stateCopy = { ...state }

// 			stateCopy.newMessageText = action.newMessage
// 			return stateCopy
// 		}
// 		default:
// 			return state
// 	}
// }
