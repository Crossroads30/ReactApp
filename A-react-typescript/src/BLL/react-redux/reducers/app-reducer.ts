import { ThunkAction } from 'redux-thunk'
import { getAuthUserData } from './auth-reducer'
import { AppStateType, InferActionsTypes } from './react-redux-store'
// const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCESS' //названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
//!!! так как типизация(ActionTypes) не позволит записать в типы ничего другого кроме тех типов которые указаны в AC, то эти константы с названиями типов можно убрать !!! 

let initialState = {
	initialized: false,
}

export type InitialStateType = typeof initialState // используем typeof для определения типов у initialState

// вместо этого см выше
// let initialState: InitialStateType = {
// 	initialized: false,
// }

// export type InitialStateType = {
// 	initialized: boolean
// }

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'app/INITIALIZED-SUCCESS':
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}

export const actions = {
	initializedSuccess: () => ({
		type: 'app/INITIALIZED-SUCCESS',
	} as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>

//вместо отдельной типизации AC, используем generic InferActionsTypes из react-redux-store
//типизация Action Creators:
// type InitializedSuccessActionType = {
// 	type: typeof INITIALIZED_SUCCESS
// }

//функции Action Creators:
// export const initializedSuccess = (): InitializedSuccessActionType => ({
// 	type: INITIALIZED_SUCCESS,
// })

//thunk Creators:

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => async dispatch => {
	let promise = dispatch(getAuthUserData())
	//dispatch(somethingElse()) //если будет что нибудь еще
	//dispatch(somethingElse()) //если будет что нибудь еще
	await Promise.all([promise]) //если надо задиспатчить несколько промисов, то их помещаем в массив и вызываем метод Promise.all([здесь промисы])
	dispatch(actions.initializedSuccess())
}

// export const initializeApp = () => async dispatch => { //если промис один
// 	await dispatch(getAuthUserData())
// 	dispatch(initializedSuccess())
// }

export default appReducer
