const ADD_MESSAGE = 'message/ADD-MESSAGE'//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера

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
}

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessage = {
				id: 7,
				message: action.newMessageBody,
			}
			return {
				...state,
				messages: [...state.messages, newMessage],
			}
		default:
			return state
	}
}

//action creators:
export const addMessage = newMessageBody => ({ type: ADD_MESSAGE, newMessageBody })

export default messageReducer