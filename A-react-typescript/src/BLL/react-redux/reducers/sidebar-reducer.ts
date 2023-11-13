import { userApi } from '../../../DAL/api/api'

const SET_FRIENDS = 'sidebar/FRIENDS'//названия для action creators должны быть уникальными, поэтому можно добавить впереди названия самого редьюсера


export type InitialStateType = {
	friends: Array<object> | null,
	totalUsersCount: number,
}

let initialState: InitialStateType = {
	friends: [],
	totalUsersCount: 50,
}

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
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

//типизация Action Creators:
type SetFriendsActionType = {
	type: typeof SET_FRIENDS
	friends: Array<object> | null
}

//actionCreators:
export const addFriends = (friends: object[]): SetFriendsActionType => ({ type: SET_FRIENDS, friends })

//thunkCreators:
export const getFriendsTC = () => async (dispatch: any) => {
const response = await userApi.getFriends()
		dispatch(addFriends(response))
}

export default sidebarReducer
