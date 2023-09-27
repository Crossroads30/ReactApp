const SET_USERS = 'SET-USERS'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
// const SET_USERS_COUNT = 'SET-USERS-COUNT'

let initialState = {
	users: [
		// {
		// 	id: 1,
		// 	isFollowed: false,
		// 	fullName: 'Darken Rahl',
		// 	avatarUrl:
		// 		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
		// 	status: 'I`m want to rule all Midlands!!!',
		// 	location: { city: 'city of D`Hara', land: 'D`Hara' },
		// },
		// {
		// 	id: 2,
		// 	isFollowed: true,
		// 	fullName: 'Richard Cypher-Rahl',
		// 	avatarUrl:
		// 		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
		// 	status: 'I`m a truth seeker',
		// 	location: { city: 'Hartland', land: 'Westland' },
		// },
		// {
		// 	id: 3,
		// 	isFollowed: true,
		// 	fullName: ' Kahlan Amnell',
		// 	avatarUrl:
		// 		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
		// 	status: 'The whole Middle lands under my protection!',
		// 	location: { city: 'Aydindril', land: 'Midlands' },
		// },
		// {
		// 	id: 4,
		// 	isFollowed: true,
		// 	fullName: 'Zeddicus Zu`l Zorander ',
		// 	avatarUrl:
		// 		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2w35-ywQxAxsVTPs5rHEF2m0b_CBnLHJNgA&usqp=CAU',
		// 	status: 'I`m a greatest wizard of the First Order!',
		// 	location: { city: 'Aydindril', land: 'Midlands' },
		// },
	],
	pageSize: 5,
	totalUsersCount: 45,
	currentPage: 1,
}

const UsersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS:
			return {
				...state,
				users: action.users,
			}
		case FOLLOW:
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
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			}
		// case SET_USERS_COUNT:
		// 	return {
		// 		...state,
		// 		totalUsersCount: action.count,
		// 	}
		default:
			return state
	}
}

export const setUsersAC = users => ({ type: SET_USERS, users })
export const followUserAC = userId => ({ type: FOLLOW, userId })
export const unfollowUserAC = userId => ({ type: UNFOLLOW, userId })
export const setCurrentPageAC = currentPage => ({
	type: SET_CURRENT_PAGE,
	currentPage
})
// export const setTotalUsersCountAC = totalUsersCount => ({
// 	type: SET_USERS_COUNT,
// 	count: totalUsersCount,
// })


export default UsersReducer
