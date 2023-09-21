import profileReducer from './profile-reducer'
import messageReducer from './message-reducer'
import sidebarReducer from './sidebar-reducer'

//эти константы были перенесены в файлы к reducers(в message-reducer и в profile-reducer)
// const ADD_POST = 'ADD-POST'
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
// const ADD_MESSAGE = 'ADD-MESSAGE'
// const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

const store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'Hi!', likes: 12 },
				{ id: 2, message: 'Nice to see you))', likes: 3 },
				{ id: 3, message: 'Grate day!', likes: 6 },
				{ id: 4, message: 'see you tomorrow', likes: 5 },
				{ id: 5, message: 'How are you?', likes: 23 },
				{ id: 6, message: 'Good night!', likes: 18 },
			],
			newPostText: '',
		},
		messagesPage: {
			dialogs: [
				{ id: 1, name: 'Max' },
				{ id: 2, name: 'Mick' },
				{ id: 3, name: 'Jack' },
				{ id: 4, name: 'John' },
				{ id: 5, name: 'Paul' },
				{ id: 6, name: 'Ken' },
			],
			messages: [
				{ id: 1, message: 'Hi!' },
				{ id: 2, message: 'Nice to see you))' },
				{ id: 3, message: 'Grate day!' },
				{ id: 4, message: 'see you tomorrow' },
				{ id: 5, message: 'How are you?' },
				{ id: 6, message: 'Good night!' },
			],
			newMessageText: '',
		},
		sidebar: {
			friends: [
				{ id: 1, name: 'Darken', avatarUrl: '' },
				{ id: 2, name: 'Richard', avatarUrl: '' },
				{ id: 3, name: 'Helen', avatarUrl: '' },
				{ id: 4, name: 'Zed', avatarUrl: '' },
			],
		},
	},
	_callRerenderTree() {},

	getState() {
		return this._state
	},
	subscribe(observer) {
		//эта функция передается в main.js в которой вызывается функция "rerenderTree" для отрисовки заново стэйта
		this._callRerenderTree = observer
	},

	// addPost() {
	// 	let newPost = {
	// 		id: 7,
	// 		message: this._state.profilePage.newPostText,
	// 		likes: 0,
	// 	}
	// 	this._state.profilePage.posts.push(newPost)
	// 	this._state.profilePage.newPostText = ''
	// 	this._callRerenderTree(this._state)
	// },
	// addMessage() {
	// 	let newMessage = {
	// 		id: 7,
	// 		message: this._state.messagesPage.newMessageText,
	// 	}
	// 	this._state.messagesPage.messages.push(newMessage)
	// 	this._state.messagesPage.newMessageText = ''
	// 	this._callRerenderTree(this._state)
	// },
	// updateNewPostText(newText) {
	// 	this._state.profilePage.newPostText = newText
	// 	this._callRerenderTree(this._state)
	// },
	// updateNewMessage(newMessage) {
	// 	this._state.messagesPage.newMessageText = newMessage
	// 	this._callRerenderTree(this._state)
	// },

	dispatch(action) {
		//применение reducers каждый отвечает за отдельную часть стэйта(страницы сайта или элемента сайта) импорт из отдельных файлов
		this._state.profilePage = profileReducer(this._state.profilePage, action)
		this._state.messagesPage = messageReducer(this._state.messagesPage, action)
		this._state.sidebar = sidebarReducer(this._state.sidebar, action)

		this._callRerenderTree(this._state) // для redux-store этот колбэк не вызывается
		//reducers заменяют код c ветвлением (if) ниже

		// if (action.type === ADD_POST) {
		// 	let newPost = {
		// 		id: 7,
		// 		message: this._state.profilePage.newPostText,
		// 		likes: 0,
		// 	}
		// 	this._state.profilePage.posts.push(newPost)
		// 	this._state.profilePage.newPostText = ''
		// 	this._callRerenderTree(this._state)
		// } else if (action.type === UPDATE_NEW_POST_TEXT) {
		// 	this._state.profilePage.newPostText = action.newText
		// 	this._callRerenderTree(this._state)
		// } else if (action.type === ADD_MESSAGE) {
		// 	let newMessage = {
		// 		id: 7,
		// 		message: this._state.messagesPage.newMessageText,
		// 	}
		// 	this._state.messagesPage.messages.push(newMessage)
		// 	this._state.messagesPage.newMessageText = ''
		// 	this._callRerenderTree(this._state)
		// } else if (action.type === UPDATE_NEW_MESSAGE) {
		// 	this._state.messagesPage.newMessageText = action.newMessage
		// 	this._callRerenderTree(this._state)
		// }
	},
}

//эти функции были перенесены в файлы к reducers(в message-reducer и в profile-reducer)
// export const addPostActionCreator = () => {
// 	return { type: ADD_POST }
// }
// export const addPostActionCreator = () => ({ type: ADD_POST }) //тоже самое что и выше, только без return!
// export const updateNewPostActionCreator = text => ({
// 	type: UPDATE_NEW_POST_TEXT,
// 	newText: text,
// })
// export const addMessageActionCreator = () => ({ type: ADD_MESSAGE })

// export const updateNewMessageActionCreator = message => ({
// 	type: UPDATE_NEW_MESSAGE,
// 	newMessage: message,
// })

export default store

// window.state = store
