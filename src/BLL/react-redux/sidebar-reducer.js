import { userApi } from '../../DAL/api/api'

const SET_FRIENDS = 'FRIENDS'
const SET_USERS_COUNT = 'SET-USERS-COUNT'

let initialState = {
	friends: [
		// { id: 1, name: 'Darken', avatarUrl: '' },
		// { id: 2, name: 'Richard', avatarUrl: '' },
		// { id: 3, name: 'Helen', avatarUrl: '' },
		// { id: 4, name: 'Zed', avatarUrl: '' },
	],
	totalUsersCount: 50,
}

const sidebarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FRIENDS:
			return {
				...state,
				friends: action.friends,
			}
		case SET_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount,
			}
		default:
			return state
	}
}

//actionCreators:
export const addFriends = friends => ({ type: SET_FRIENDS, friends })
export const setTotalUsersCount = totalUsersCount => ({
	type: SET_USERS_COUNT,
	totalUsersCount,
})

//thunkCreators:
export const getFriendsTC = totalUsersCount => dispatch => {
	userApi.getFriends().then(response => {
		console.log(response)
		dispatch(addFriends(response, totalUsersCount))
		dispatch(setTotalUsersCount(totalUsersCount))
	})
}

export default sidebarReducer
