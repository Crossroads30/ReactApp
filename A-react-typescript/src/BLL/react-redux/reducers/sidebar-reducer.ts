import { userApi } from '../../../DAL/api/userApi'
import { BaseThunkType, InferActionsTypes } from './react-redux-store'

let initialState = {
	friends: [] as Array<object>,
	totalUsersCount: 50 as number,
}

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: ActionTypes): InitialStateType => {
	switch (action.type) {
		case 'sidebar/FRIENDS':
			return {
				...state,
				friends: action.friends,
			}
		default:
			return state
	}
}

//типизация Action Creators:
type ActionTypes = InferActionsTypes<typeof actions>

//actionCreators:

const actions = {
	addFriends: (friends:Array<object>) => ({ type: 'sidebar/FRIENDS', friends } as const),
}


// вместо явной типизации ниже, используем generic BaseThunkType из react-redux-store.ts и передаем в него в качестве параметра - ActionsTypes, остальное приходит по умолчанию
type ThunkType = BaseThunkType<ActionTypes>

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, SetFriendsActionType>

//thunkCreators:
export const getFriendsTC = (): ThunkType => async (dispatch) => {
	const friendsData = await userApi.getFriends()
	dispatch(actions.addFriends(friendsData))
}

export default sidebarReducer
