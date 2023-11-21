
import { stopSubmit } from 'redux-form'
import { ResultCodesEnum, ResultCodesWithCaptcha, authAPI, securityAPI } from '../../../DAL/api/api.ts'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionsTypes } from './react-redux-store.ts'

//!!! так как типизация(ActionTypes) не позволит записать в типы ничего другого кроме тех типов которые указаны в AC, то эти константы с названиями типов можно убрать !!! 
// const SET_USER_DATA = 'auth/SET-USER-DATA' //названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера
// const CAPTCHA_URL_SUCCESS = 'auth/CAPTCHA-URL-SUCCESS'

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

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'auth/SET_USER_DATA':
		case 'auth/CAPTCHA_URL_SUCCESS':
			return {
				...state,
				...action.data,
			}
		default:
			return state
	}
}



//типизация Action Creators:
// 

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
	setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
		type: 'auth/SET_USER_DATA',
		data: { id, email, login, isAuth },
	}),

	getCaptchaUrlSuccess: (captchaURL: string | null) => ({
		type: 'auth/CAPTCHA_URL_SUCCESS',
		data: { captchaURL },
	}),
}

//thunk Creators:

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
	// вместо then() используем async await
	const getAuthData = await authAPI.getAuth() // забираем data из then() из authAPI.getAuth() в api.ts

	const { id, email, login } = getAuthData.data
	getAuthData.resultCode === ResultCodesEnum.Success && dispatch(actions.setAuthUserData(id, email, login, true)) // берем номер кода из enum (ResultCodesEnum.Success = 0)
}

//так же надо передать и символы из капчи
export const loginToServer =
	(email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
	async (dispatch) => {
		const loginData= await authAPI.getLogin(email, password, rememberMe, captcha)
		// debugger
		if (loginData.resultCode === ResultCodesEnum.Success) {
			dispatch(getAuthUserData())
		} else {
			if (loginData.resultCode === ResultCodesWithCaptcha.CaptchaIsRequired) {
				//условие если слишком много попыток логина и надо показать капчу, то мы диспачем санку  getCaptchaURL
				dispatch(getCaptchaURL())
			}

			// stopSubmit - специальный метод из redux-form, который передает обработанную ошибку внутрь определенной формы, первым параметром идет имя формы('login'), вторым параметром идет сама ошибка и сообщение к ней(в данном случае это общая ошибка '_error')
			const message = loginData.messages.length > 0 ? loginData.messages[0] : 'some error' //передаем в качестве ошибки сообщение из response.data.messages из api запроса
			// dispatch(stopSubmit('login', { _error: message })) //??? no type !!! ???
		}
	}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
	const captchaUrlData = await securityAPI.getCaptchaURL()
	// debugger
	// const captchaURL = captchaUrlData.url
	dispatch(actions.getCaptchaUrlSuccess(captchaUrlData.url))
}

export const logoutFromServer = (): ThunkType => async (dispatch) => {
	// вместо then() используем async await
	const logoutData = await authAPI.getLogout()
	// debugger
	logoutData.resultCode === ResultCodesEnum.Success && dispatch(actions.setAuthUserData(null, null, null, false))
	// dispatch((window.location.href = 'login')) // пока очень корявое решение
}

export default authReducer

//------------------------------------------
//старая версия типизация Action Creators:

// type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

// type SetAuthUserDataActionDataType = {
// 	id: number | null
// 	email: string | null
// 	login: string | null
// 	isAuth: boolean
// }

// type SetAuthUserDataActionType = {
// 	type: typeof SET_USER_DATA
// 	data: SetAuthUserDataActionDataType
// }

// type GetCaptchaUrlSuccessActionType = {
// 	type: typeof CAPTCHA_URL_SUCCESS
// 	data: { captchaURL: string | null } //задали тип для data
// }

//функции Action Creators:
// export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
// 	type: SET_USER_DATA,
// 	data: { id, email, login, isAuth },
// })

// export const getCaptchaUrlSuccess = (captchaURL: string | null): GetCaptchaUrlSuccessActionType => ({
// 	type: CAPTCHA_URL_SUCCESS,
// 	data: { captchaURL },
// })