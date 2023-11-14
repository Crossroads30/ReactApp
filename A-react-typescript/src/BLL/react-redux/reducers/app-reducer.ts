import { ThunkAction } from 'redux-thunk'
import { getAuthUserData } from './auth-reducer'
import { AppStateType } from './react-redux-store'
const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCESS' //названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера

export type InitialStateType = {
	initialized: boolean,
}

let initialState: InitialStateType = {
	initialized: false,
}

const appReducer = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			}
		default:
			return state
	}
}
//типизация Action Creators:
type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}
//функции Action Creators:
export const initializedSuccess = (): InitializedSuccessActionType => ({
	type: INITIALIZED_SUCCESS,
})


//thunk Creators:

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, InitializedSuccessActionType>

export const initializeApp = (): ThunkType => async (dispatch) => {
	let promise = dispatch(getAuthUserData())
	//dispatch(somethingElse()) //если будет что нибудь еще
	//dispatch(somethingElse()) //если будет что нибудь еще
	await Promise.all([promise]) //если надо задиспатчить несколько промисов, то их помещаем в массив и вызываем метод Promise.all([здесь промисы])
	dispatch(initializedSuccess())
}

// export const initializeApp = () => async dispatch => { //если промис один
// 	await dispatch(getAuthUserData())
// 	dispatch(initializedSuccess())
// }

export default appReducer
