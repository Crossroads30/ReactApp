import { authAPI } from '../../DAL/api/api'

const SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
	id: null,
	email: null,
	login: null,
	isLoading: true,
	isAuth: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: true,
			}
		default:
			return state
	}
}

//функции Action Creators:
export const setAuthUserData = (id, email, login) => ({
	type: SET_USER_DATA,
	data: { id, email, login },
})

//thunk Creators:
export const getAuthUserData = () => dispatch => {// короткая запись в одну строку
	authAPI.getAuth().then(response => {
		// debugger
			const { id, email, login } = response.data.data
			response.data.resultCode === 0 && 
			dispatch(setAuthUserData(id, email, login))
		})
}

// export const getAuthUserData = (id, email, login) => {// длинная запись с return
// 	return dispatch => {
// 		dispatch(setAuthUserData(id, email, login)) 
// 		authAPI.getAuth().then(response => {
// 			const { id, email, login } = response.data.data
// 			response.data.resultCode === 0 && setAuthUserData(id, email, login)
// 		})
// 	}
// }

export default authReducer
