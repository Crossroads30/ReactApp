const ADD_USER = 'ADD-USER'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'

let initialState = {
	users: [
		{
			id: 1,
			isFollowed: false,
			fullName: 'Darken Rahl',
			avatarUrl: '',
			status: 'I`m want to rule all Midlands!!!',
			location: { city: 'city of D`Hara', land: 'D`Hara' },
		},
		{
			id: 2,
			isFollowed: true,
			fullName: 'Richard Cypher-Rahl',
			avatarUrl: '',
			status: 'I`m a truth seeker',
			location: { city: 'Hartland', land: 'Westland' },
		},
		{
			id: 3,
			isFollowed: true,
			fullName: ' Kahlan Amnell',
			avatarUrl: '',
			status: 'The whole Middle lands under my protection!',
			location: { city: 'Aydindril', land: 'Midlands' },
		},
		{
			id: 4,
			isFollowed: true,
			fullName: 'Zeddicus Zu`l Zorander ',
			avatarUrl: '',
			status: 'I`m a greatest wizard of the First Order!',
			location: { city: 'Aydindril', land: 'Midlands' },
		},
	],
	newUser: {},
}

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			let newUser = {
				id: 5,
				name: 'Gratch',
				avatarUrl: '',
			}
			return {
				...state,
				posts: [...state.users, newUser],
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
							return { ...user, isFollowed: true }
						}
						return user
					}), //если внутри массива надо изменить какие-либо объекты
				}
		default:
			return state
	}
}

export const addUserAC = () => ({ type: ADD_USER })
export const followUserAC = userId => ({ type: FOLLOW, userId })
export const unfollowUserAC = userId => ({ type: UNFOLLOW, userId })

export default UsersReducer
