
import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '../../../DAL/api/api'

const SET_USER_DATA = 'auth/SET-USER-DATA' //названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
const CAPTCHA_URL_SUCCESS = 'auth/CAPTCHA-URL-SUCCESS'

// export type InitialStateType = {
// 	id: number | null
// 	email: string | null
// 	login: string | null
// 	isLoading: boolean
// 	isAuth: boolean
// 	captchaURL: string | null
// }

let initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isLoading: true as boolean,
	isAuth: false as boolean,
	captchaURL: null as string | null, // if null, then captcha is not required
}

export type InitialStateType = typeof initialState //типизация по умолчанию

const authReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.data,
				blablaid: 'name',//??? почему то нет ошибки ???
			}
		default:
			return state
	}
}

//типизация Action Creators:
type SetAuthUserDataActionDataType = {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}


type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA
	data: SetAuthUserDataActionDataType
}

//функции Action Creators:
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
	type: SET_USER_DATA,
	data: { id, email, login, isAuth },
})

//типизация Action Creators:
type GetCaptchaUrlSuccessActionType = {
	type: typeof CAPTCHA_URL_SUCCESS
	data: { captchaURL: string | null }//задали тип для data 
}

export const getCaptchaUrlSuccess = (captchaURL: string | null): GetCaptchaUrlSuccessActionType => ({
	type: CAPTCHA_URL_SUCCESS,
	data: { captchaURL },
})

//thunk Creators:
export const getAuthUserData = () => async (dispatch: any) => {
	// вместо then() используем async await
	const response = await authAPI.getAuth()

	const { id, email, login } = response.data.data
	response.data.resultCode === 0 && dispatch(setAuthUserData(id, email, login, true))
}

//так же надо передать и символы из капчи
export const loginToServer = (email: string, password: string, rememberMe: boolean, captcha: null ) => async (dispatch: any) => {
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

export const getCaptchaURL = () => async (dispatch: any) => {
	const response = await securityAPI.getCaptchaURL()
	// debugger
	const captchaURL = response.data.url
	dispatch(getCaptchaUrlSuccess(captchaURL))
}

export const logoutFromServer = () => async (dispatch: any) => {
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
