import { getAuthUserData } from './auth-reducer'
const INITIALIZED_SUCCESS = 'app/INITIALIZED-SUCCESS' //названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера

let initialState = {
	initialized: false,
}

const appReducer = (state = initialState, action) => {
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

//функции Action Creators:
export const initializedSuccess = () => ({
	type: INITIALIZED_SUCCESS,
})

//thunk Creators:
export const initializeApp = () => async dispatch => {
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
