import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../../../DAL/api/api'

const SET_USER_DATA = 'auth/SET-USER-DATA' //названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
const CAPTCHA_URL_SUCCESS = 'auth/CAPTCHA-URL-SUCCESS'

let initialState = {
	id: null,
	email: null,
	login: null,
	isLoading: true,
	isAuth: false,
	captchaURL: null,// if null, then captcha is not required
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
		case CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.data,
			}
		// case CAPTCHA_URL_SUCCESS:// если в двух и более 'кейсов' нужно вернуть одинаковый стэйт, то можно 'кейсы' прописать друг за другом( см 'кейс' выше) 
		// 	return {
		// 		...state,
		// 		...action.data,
		// 	}
		default:
			return state
	}
}

//функции Action Creators:
export const setAuthUserData = (id, email, login, isAuth ) => ({
	type: SET_USER_DATA,
	data: { id, email, login, isAuth  },
})

export const getCaptchaUrlSuccess = captchaURL => ({
	type: CAPTCHA_URL_SUCCESS,
	data: {captchaURL},
})

//thunk Creators:
export const getAuthUserData = () => async dispatch => {
	// вместо then() используем async await
	const response = await authAPI.getAuth()

	const { id, email, login } = response.data.data
	response.data.resultCode === 0 && dispatch(setAuthUserData(id, email, login, true))
}

//так же надо передать и символы из капчи
export const loginToServer = (email, password, rememberMe, captcha) => async dispatch => {
	const response = await authAPI.getLogin(email, password, rememberMe, captcha)
	// debugger
	if (response.data.resultCode === 0) {
		dispatch(getAuthUserData())
	} else {

		if (response.data.resultCode === 10) {
			//условие если слишком много попыток логина и надо показать капчу, то мы диспачем санку  getCaptchaURL
			dispatch(getCaptchaURL())
		}

		// stopSubmit - специальный метод из redux-form, который передает обработанную ошибку внутрь определенной формы, первым параметром идет имя формы('login'), вторым параметром идет сама ошибка и сообщение к ней(в данном случае это общая ошибка '_error')
		const message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error' //передаем в качестве ошибки сообщение из response.data.messages из api запроса
		dispatch(stopSubmit('login', { _error: message }))
	}
}

export const getCaptchaURL = () => async dispatch => {
	const response = await securityAPI.getCaptchaURL()
	// debugger
	const captchaURL = response.data.url
	dispatch(getCaptchaUrlSuccess(captchaURL))
}

export const logoutFromServer = () => async dispatch => {
	// вместо then() используем async await
	const response = await authAPI.getLogout()
	// debugger
	response.data.resultCode === 0 && dispatch(setAuthUserData(null, null, null, false))
	// dispatch((window.location.href = 'login')) // пока очень корявое решение
}

// export const logoutFromServer = () => dispatch => { //вариант с then()
// 	authAPI.getLogout().then(response => {
// 		// debugger
// 		response.data.resultCode === 0 &&
// 			dispatch(setAuthUserData(null, null, null, false))
// 		dispatch((window.location.href = 'login')) // пока очень корявое решение
// 	})
// }

export default authReducer
