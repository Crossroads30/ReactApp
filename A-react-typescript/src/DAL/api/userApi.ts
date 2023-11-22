import { instance, BaseResponseType, ResultMessagesDataType } from './api.ts'
import { UserType } from '../../types/types'

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
			.post<BaseResponseType>(`follow/${userId}`) // в post объект настройки { withCredentials: true } идет третьем параметром
			.then(response => response.data)
	},

	async getUnFollow(userId: number) {
		//запрос на follow users
		return (await instance
			.delete(`follow/${userId}`) // в delete объект настройки { withCredentials: true } идет вторым параметром
			.then(response => response.data)) as Promise<BaseResponseType>
	},

	async getFriends(totalUsersCount: number = 30) {
		// debugger
		return await instance.get<UserApiType>(`users?friend=true&count=${totalUsersCount}`).then(response => response.data.items)
	},
}
