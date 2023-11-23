import { describe, it, expect } from 'vitest'
import profileReducer, {actions} from './profile-reducer'

let state = {
	posts: [
		{ id: 1, message: 'Hi!', likes: 12 },
		{ id: 2, message: 'Nice to see you))', likes: 3 },
		{ id: 3, message: 'Grate day!', likes: 6 },
		{ id: 4, message: 'see you tomorrow', likes: 5 },
		{ id: 5, message: 'How are you?', likes: 23 },
		{ id: 6, message: 'Good night!', likes: 18 },
	],
	userProfile: null ,
	status: '',
	userDataStatus: '',
}

describe('new post to be pushed to state', () => {
	it('length of posts should be incremented', () => {
    //1. test data
		let action = actions.addPost('some new post')

    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(7)
	})

	it('message of new post should be correct', () => {
		//1. test data
		let action = actions.addPost('some new post')

		//2. action
		let newState = profileReducer(state, action)

		//3. expectation
		expect(newState.posts[6].message).toBe('some new post')
	})
})

describe('post to be deleted from state', () => {
	it('after deleting length of message should be decremented', () => {
		//1. test data
		let action = actions.deletePost(1)

		//2. action
		let newState = profileReducer(state, action)

		//3. expectation
		expect(newState.posts.length).toBe(5)
	})

	it('after deleting length of posts should not be decremented if post id is wrong', () => {
		//1. test data
		let action = actions.deletePost(100)

		//2. action
		let newState = profileReducer(state, action)

		//3. expectation
		expect(newState.posts.length).toBe(6)
	})
})
