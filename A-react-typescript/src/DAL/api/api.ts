import axios from 'axios'

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '614d93d1-da90-4c3e-bd9c-0c093271d9f2',
	},
})

export type ResultMessagesDataType = {
	resultCode: ResultCodesEnum
	messages: Array<string>
	data: Object
}

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}