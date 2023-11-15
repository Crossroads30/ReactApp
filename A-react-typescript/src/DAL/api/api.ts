import axios from 'axios'
import { ProfileType, UserType } from '../../types/types'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '614d93d1-da90-4c3e-bd9c-0c093271d9f2',
	},
})

//------------------------ userApi ---------------------------------------------

type UserApiType = {
	items: Array<UserType>
	totalCount: number
	error: null | string
}


export const userApi = {
	async getUsers(currentPage: number = 1, pageSize: number = 5) {
		return await instance.get<UserApiType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data.items)
	},

	// async getProfile(profileId: number) {
	// 	console.warn('Deprecated method. Please use profileApi object!')
	// 	//запрос на получения id из profile
	// 	return await profileApi.getProfile(profileId) //делегировали вызов этого метода из profileApi
	// },

	async getFollow(userId: number) {
		//запрос на follow users
		return await instance
			.post<ResultMessagesDataType>(`follow/${userId}`) // в post объект настройки { withCredentials: true } идет третьем параметром
			.then(response => response.data)
	},

	async getUnFollow(userId: number) {
		//запрос на follow users
		return await instance
			.delete<ResultMessagesDataType>(`follow/${userId}`) // в delete объект настройки { withCredentials: true } идет вторым параметром
			.then(response => response.data)
	},

	async getFriends(totalUsersCount: number = 30) {
		// debugger
		return await instance.get<UserApiType>(`users?friend=true&count=${totalUsersCount}`).then(response => response.data.items)
	},
}

//-------------------profileApi-------------------------------

type ProfileResponseType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: {
		github: string
		vk: string
		facebook: string
		instagram: string
		twitter: string
		website: string
		youtube: string
		mainLink: string
	}
	photos: {
		small: string
		large: string
	}
}

type ResultMessagesDataType = {
	resultCode: ResultCodesEnum
	messages: Array<string>
	data: Object
}

type UpdatePhotoResponseType = {
	data: {
		photos: {
			small: string
			large: string
		}
	}
	resultCode: ResultCodesEnum
	messages: Array<string>
}

export const profileApi = {
	async getProfile(profileId: number | null) {
		//запрос на получения id из profile
		return await instance.get<ProfileResponseType>(`profile/` + profileId).then(res => res.data)
	},
	async getStatus(profileId: number) {
		//запрос на получения статуса из profile
		return await instance.get<string>(`profile/status/` + profileId).then(res => res.data)
	},
	async updateStatus(status: string) {
		//запрос на обновления статуса в profile
		return await instance.put<ResultMessagesDataType>(`profile/status`, { status }).then(res => res.data) //вторым параметром передаем объект, то что требует документация: (status: required(string - maxLength: 300))
	},
	async savePhoto(userPhotoFile: File) {
		//запрос на отправку фото в profile
		const formData = new FormData() // создаем форм дату для отправки на сервер
		formData.append('image', userPhotoFile) // передаем сюда Properties из документации сервера:	image: required(file), и сам файл(userPhotoFile)

		return await instance.put<UpdatePhotoResponseType>(`profile/photo`, formData, {
			//вторым параметром передаем formData, а третьем параметром настраиваем специфические заголовки для этого запроса т.к. отправляем не json, а formData, и мы должны сказать что наш Content-Type является 'multipart/form-data'
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}).then(res => res.data)
	},

	async saveUserData(profile: ProfileType) {
		return await instance.put<ResultMessagesDataType>(`profile`, profile).then(res => res.data)
	},
}

//-------------------authAPI-------------------------------

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
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

type GetLoginResponseType = {
	data: {
		userId: number
	}
	resultCode: ResultCodesWithCaptcha | ResultCodesEnum
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

//------------------------- securityAPI -------------------------------------

type GetCaptchaURLType = {
	url: string
}

export const securityAPI = {
	async getCaptchaURL() {
		//запрос на подтверждения аутентификации
		return await instance.get<GetCaptchaURLType>(`security/get-captcha-url`).then(res => res.data)
	},
}
