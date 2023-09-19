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
				{ id: 1, name: 'Peter', avatarUrl: '' },
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
	rerender(observer) {
		//эта функция передается в main.js в которой вызывается функция "rerenderTree" для отрисовки заново стэйта
		this._callRerenderTree = observer
	},

	addPost() {
		let newPost = {
			id: 7,
			message: this._state.profilePage.newPostText,
			likes: 0,
		}
		this._state.profilePage.posts.push(newPost)
		this._state.profilePage.newPostText = ''
		this._callRerenderTree(this._state)
	},
	addMessage() {
		let newMessage = {
			id: 7,
			message: this._state.messagesPage.newMessageText,
		}
		this._state.messagesPage.messages.push(newMessage)
		this._state.messagesPage.newMessageText = ''
		this._callRerenderTree(this._state)
	},
	updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText
		this._callRerenderTree(this._state)
	},
	updateNewMessage(newMessage) {
		this._state.messagesPage.newMessageText = newMessage
		this._callRerenderTree(this._state)
	},
}

export default store
window.state = store
