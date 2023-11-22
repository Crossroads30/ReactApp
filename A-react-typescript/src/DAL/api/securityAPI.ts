import { instance } from './api.ts'

 type GetCaptchaURLType = {
	url: string
}

export const securityAPI = {
	async getCaptchaURL() {
		//запрос на подтверждения аутентификации
		return await instance.get<GetCaptchaURLType>(`security/get-captcha-url`).then(res => res.data)
	},
}
