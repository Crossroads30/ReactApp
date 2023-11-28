import { beforeEach, describe, expect, it } from 'vitest'
import UsersReducer, { InitialStateType, actions } from './users-reducer'

let state: InitialStateType

beforeEach(() => {
	state = {
		users: [
			{
				id: 0,
				name: 'Jacob 0',
				followed: false,
				photos: { small: null, large: null },
				status: 'status 0',
			},
			{
				id: 1,
				name: 'Jacob 1',
				followed: false,
				photos: { small: null, large: null },
				status: 'status 1',
			},
			{
				id: 2,
				name: 'Jacob 2',
				followed: true,
				photos: { small: null, large: null },
				status: 'status 2',
			},
			{
				id: 3,
				name: 'Jacob 3',
				followed: true,
				photos: { small: null, large: null },
				status: 'status 3',
			},
		],
		pageSize: 5,
		totalUsersCount: 0,
		currentPage: 1,
		isLoading: false,
		followingInProgress: [],
	}
})

describe('follow / unfollow test', () => {
	it('follow user to be success', () => {
		const newState = UsersReducer(state, actions.followUser(1))

		expect(newState.users[0].followed).toBeFalsy()
		expect(newState.users[1].followed).toBeTruthy()
	})

	it('unfollow user to be success', () => {
		const newState = UsersReducer(state, actions.unfollowUser(3))

		expect(newState.users[0].followed).toBeFalsy()
		expect(newState.users[2].followed).toBeTruthy()
		expect(newState.users[3].followed).toBeFalsy()
	})
})
