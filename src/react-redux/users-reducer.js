const SET_USERS = 'SET-USERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'

let initialState = {
	users: [],
}

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				users: [...state.users, ...action.users],
			}
		case FOLLOW:
			return {
				...state,
				// users: [...state.users], //если внутри массива не надо что либо менять
				users: state.users.map( user => {
          if(user.id === action.userId) {
            return {...user, isFollowed: true}
          }
          return user
        }), //если внутри массива надо изменить какие-либо объекты
			}
      case UNFOLLOW:
        return {
					...state,
					// users: [...state.users], //если внутри массива не надо что либо менять
					users: state.users.map(user => {
						if (user.id === action.userId) {
							return { ...user, isFollowed: false }
						}
						return user
					}), //если внутри массива надо изменить какие-либо объекты
				}
		default:
			return state
	}
}

export const setUsersAC = (users) => ({ type: SET_USERS, users })
export const followUserAC = userId => ({ type: FOLLOW, userId })
export const unfollowUserAC = userId => ({ type: UNFOLLOW, userId })

export default UsersReducer
