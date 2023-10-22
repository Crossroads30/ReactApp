import axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '614d93d1-da90-4c3e-bd9c-0c093271d9f2',
	},
})

export const userApi = {
	async getUsers(currentPage = 1, pageSize = 5) {
		return await instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data.items)
	},

	async getProfile(profileId) {
		console.warn('Deprecated method. Please use profileApi object!')
		//запрос на получения id из profile
		return await profileApi.getProfile(profileId) //делегировали вызов этого метода из profileApi
	},

	async getFollow(userId) {
		//запрос на follow users
		return await instance
			.post(`follow/${userId}`) // в post объект настройки { withCredentials: true } идет третьем параметром
			.then(response => response.data)
	},

	async getUnFollow(userId) {
		//запрос на follow users
		return await instance
			.delete(`follow/${userId}`) // в delete объект настройки { withCredentials: true } идет вторым параметром
			.then(response => response.data)
	},

	async getFriends(totalUsersCount = 30) {
		// debugger
		return await instance
			.get(`users?friend=true&count=${totalUsersCount}`)
			.then(response => response.data.items)
	},
}

export const profileApi = {
	async getProfile(profileId) {
		//запрос на получения id из profile
		return await instance.get(`profile/` + profileId)
	},
	async getStatus(profileId) {
		//запрос на получения статуса из profile
		return await instance.get(`profile/status/` + profileId)
	},
	async updateStatus(status) {
		//запрос на обновления статуса в profile
		return await instance.put(`profile/status`, { status }) //вторым параметром передаем объект, то что требует документация: (status: required(string - maxLength: 300))
	},
	async savePhoto(userPhotoFile) {
		//запрос на отправку фото в profile
		const formData = new FormData() // создаем форм дату для отправки на сервер
		formData.append('image', userPhotoFile) // передаем сюда Properties из документации сервера:	image: required(file), и сам файл(userPhotoFile)

		return await instance.put(`profile/photo`, formData, {
			//вторым параметром передаем formData, а третьем параметром настраиваем специфические заголовки для этого запроса т.к. отправляем не json, а formData, и мы должны сказать что наш Content-Type является 'multipart/form-data'
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	async saveUserData(profile) {
		return await instance.put(`profile`,  profile )
	}
}


export const authAPI = {
	async getAuth() {
		//запрос на подтверждения аутентификации
		return await instance.get(`auth/me`)
	},
	async getLogin(email, password, rememberMe = false, captcha = null ) {
		//запрос на 'login' на  сервер через приложение
		return await instance.post(`auth/login`, {
			//вторым параметром передаем объект, то что требует документация
			email,
			password,
			rememberMe,
			captcha,
		})
	},
	async getLogout() {
		//запрос на 'logout' из сервера через приложение
		return await instance.delete(`auth/login`)
	},
}


export const securityAPI = {
	async getCaptchaURL() {
		//запрос на подтверждения аутентификации
		return await instance.get(`security/get-captcha-url`)
	}
}
