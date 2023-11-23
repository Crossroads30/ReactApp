import { DialogsType, MessagesType } from "../../../types/types"
import { InferActionsTypes } from "./react-redux-store"

//!!! так как типизация(ActionTypes) не позволит записать в типы ничего другого кроме тех типов которые указаны в AC, то эти константы с названиями типов можно убрать !!! 
// const ADD_MESSAGE = 'message/ADD-MESSAGE'//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера

// type DialogsType = {
// 	id: number
// 	name: string
// }

// type MessagesType = {
// 	id: number
// 	message: string
// }

let initialState = {
	dialogs: [
		{ id: 1, name: 'Max' },
		{ id: 2, name: 'Mick' },
		{ id: 3, name: 'Jack' },
		{ id: 4, name: 'John' },
		{ id: 5, name: 'Paul' },
		{ id: 6, name: 'Ken' },
	] as Array<DialogsType>, // import from types.ts
	messages: [
		{ id: 1, message: 'Hi!' },
		{ id: 2, message: 'Nice to see you))' },
		{ id: 3, message: 'Grate day!' },
		{ id: 4, message: 'see you tomorrow' },
		{ id: 5, message: 'How are you?' },
		{ id: 6, message: 'Good night!' },
	] as Array<MessagesType>, // import from types.ts
}

export type InitialStateType = typeof initialState

const messageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'message/ADD-MESSAGE':
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

// type AddMessageType = {
// 	type: typeof ADD_MESSAGE
// 	newMessageBody: string
// }

type ActionsTypes = InferActionsTypes<typeof actions>

//action creators:
export const actions = {
	addMessage: (newMessageBody: string) => ({ type: 'message/ADD-MESSAGE', newMessageBody } as const),
}


export default messageReducer