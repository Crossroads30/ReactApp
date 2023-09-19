let rerenderTree = () => {}

const state = {
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
}

window.state = state

export const addPost = () => {
	let newPost = {
		id: 7,
		message: state.profilePage.newPostText,
		likes: 0,
	}
	state.profilePage.posts.push(newPost)
	state.profilePage.newPostText = ''
	rerenderTree(state)
}

export const addMessage = () => {
	let newMessage = {
		id: 7,
		message: state.messagesPage.newMessageText,
	}
	state.messagesPage.messages.push(newMessage)
	state.messagesPage.newMessageText = ''
	rerenderTree(state)
}

export const updateNewPostText = newText => {
	state.profilePage.newPostText = newText
	rerenderTree(state)
}

export const updateNewMessage = newMessage => {
	state.messagesPage.newMessageText = newMessage
	rerenderTree(state)
}

export const subscribe = observer => {
	rerenderTree = observer
}

export default state
