import { ProfileType } from '../../types/types'
import { instance, ResultCodesEnum, ResultMessagesDataType } from './api.ts'

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

		return await instance
			.put<UpdatePhotoResponseType>(`profile/photo`, formData, {
				//вторым параметром передаем formData, а третьем параметром настраиваем специфические заголовки для этого запроса т.к. отправляем не json, а formData, и мы должны сказать что наш Content-Type является 'multipart/form-data'
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(res => res.data)
	},

	async saveUserData(profile: ProfileType) {
		return await instance.put<ResultMessagesDataType>(`profile`, profile).then(res => res.data)
	},
}
