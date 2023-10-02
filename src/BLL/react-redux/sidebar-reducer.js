import { userApi } from '../../DAL/api/api'

const SET_FRIENDS = 'FRIENDS'

let initialState = {
	friends: [],
	totalUsersCount: 50,
}

const sidebarReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_FRIENDS:
			return {
				...state,
				friends: action.friends,
			}
		default:
			return state
	}
}

//actionCreators:
export const addFriends = friends => ({ type: SET_FRIENDS, friends })

//thunkCreators:
export const getFriendsTC = totalUsersCount => dispatch => {
	userApi.getFriends(totalUsersCount).then(response => {
		// console.log(response)
		dispatch(addFriends(response))
	})
}

export default sidebarReducer
