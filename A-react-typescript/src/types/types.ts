export type PostsType = {
	id: number
	message: string
	likes: number
}

export type ContactsType = {
	github: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}

export type PhotosType = {
	small: string | null
	large: string | null
}

export type ProfileType = {
	userId: number | null
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
	aboutMe: string
}

export type UserType = {
	id: number
	name: string
	status: string
	photos: PhotosType
	followed: boolean
}

export type DialogsType = {
	id: number
	name: string
	// newMessageText: string
}

 export type MessagesType = {
	id: number
	message: string
}