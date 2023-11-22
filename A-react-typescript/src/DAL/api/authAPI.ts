import { instance, ResultMessagesDataType, ResultCodesEnum } from './api.ts'

 type GetLoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesWithCaptcha | ResultCodesEnum
	messages: Array<string>
}

 export enum ResultCodesWithCaptcha {
	CaptchaIsRequired = 10,
}

 type GetAuthResponseType = {
	data: {
		id: number
		email: string
		login: string
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

export const authAPI = {
	async getAuth() {
		//запрос на подтверждения аутентификации
		return await instance.get<GetAuthResponseType>(`auth/me`).then(res => res.data) //возвращаем из getAuth() не Промис, а data через then(res => res.data)
	},
	async getLogin(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
		//запрос на 'login' на  сервер через приложение
		return await instance
			.post<GetLoginResponseType>(`auth/login`, {
				//вторым параметром передаем объект, то что требует документация
				email,
				password,
				rememberMe,
				captcha,
			})
			.then(res => res.data) //возвращаем из getLogin() не Промис, а data через then(res => res.data)
	},
	async getLogout() {
		//запрос на 'logout' из сервера через приложение
		return await instance.delete<ResultMessagesDataType>(`auth/login`).then(res => res.data)
	},
}
