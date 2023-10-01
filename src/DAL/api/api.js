import axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '3f7ad031-df1b-42ff-b2a2-b96c84e80631',
	},
})

export const userApi = {
	async getUsers(currentPage = 1, pageSize = 5) {
		return await instance
			.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data.items)
	},

	async getProfile(profileId) {
		//запрос на получения id из profile
		return await instance.get(`profile/` + profileId)
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

export const authAPI = {
	async getAuth() {
		//запрос на подтверждения аутентификации
		return await instance.get(`auth/me`)
	},
}
