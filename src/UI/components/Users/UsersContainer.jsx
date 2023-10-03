import React from 'react'
import Users from './Users'
import {
	follow,
	unfollow,
	setCurrentPage,
	setTotalUsersCount,
	getUsers,
} from '../../../BLL/react-redux/users-reducer'
import { getFriendsTC } from '../../../BLL/react-redux/sidebar-reducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../../HOC/withAuthRedirect' 
import { compose } from 'redux'

class UsersContainer extends React.Component {
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize)//этот колбэк(getUsers) передает эти параметры в thunkCreator
	}

	onPageChange = pageNumber => {
		//!!!!обратить внимание что этот синтаксис этого метода - стрелочная функция!!!!
		this.props.getUsers(pageNumber, this.props.pageSize) //этот колбэк(getUsers) передает эти параметры в thunkCreator getUsers
	}

	onUserToFriends = () => {
		this.props.getFriendsTC()
	}

	render() {
		return (
			<>
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					onPageChange={this.onPageChange}
					users={this.props.users}
					unfollow={this.props.unfollow}
					follow={this.props.follow}
					isLoading={this.props.isLoading}
					followingInProgress={this.props.followingInProgress}
					setFriend={this.props.getFriendsTC}
				/>
			</>
		)
	}
}


const setStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isLoading: state.usersPage.isLoading,
		followingInProgress: state.usersPage.followingInProgress,
	}
}

// const setDispatchTpProps = dispatch => {
// 	return {
// 		follow: userId => {
// 			dispatch(followUserAC(userId))
// 		},
// 		unfollow: userId => {
// 			dispatch(unfollowUserAC(userId))
// 		},
// 		setUsers: users => {
// 			dispatch(setUsersAC(users))
// 		},
// 		setCurrentPage: pageNumber => {
// 			dispatch(setCurrentPageAC(pageNumber))
// 		},
// 		setIsLoading: isLoading => {
// 			dispatch(setIsLoadingAC(isLoading))
// 		}
// 		// setTotalUsersCount: usersCount => {
// 		// 	dispatch(setTotalUsersCountAC(usersCount))
// 		// }
// 	}
// }

// сокращенный вариант записи:
//вместо setDispatchTpProps помещаем объект с ссылками на action creators в 'connect' и возвращаем именно callback не 'creators'(это просто сокращенный синтаксис того что написано выше в 'setDispatchTpProps') 

//------------------------------------------------
//HOC withAuthRedirect вариант1:
// let AuthRedirectComponent = withAuthRedirect(UsersContainer)//HOC отвечающий за отправку на страницу логина если пользователь без аутентификации

//вариант1:
// export default connect(setStateToProps, {
// 	follow,
// 	unfollow,
// 	setCurrentPage,
// 	setTotalUsersCount,
// 	getUsers,
// 	getFriendsTC,
// })(AuthRedirectComponent)

//HOC withAuthRedirect вариант2:
//HOC connect внутри HOC withAuthRedirect отвечающего за отправку на страницу логина если пользователь без аутентификации
// export default withAuthRedirect(
// 	connect(setStateToProps, {
// 		follow,
// 		unfollow,
// 		setCurrentPage,
// 		setTotalUsersCount,
// 		getUsers,
// 		getFriendsTC,
// 	})(UsersContainer)
// )
//------------------------------------------------

//вместо того что выше:
// экспортируем по умолчанию функцию “конвейер” в которую передаются другие функции в которые по цепочке вкладываются как бы друг в друга с определенным компонентом в основании:
export default compose(
	connect(setStateToProps, {// в connect вкладывается withAuthRedirect c UsersContainer
		follow,
		unfollow,
		setCurrentPage,
		setTotalUsersCount,
		getUsers,
		getFriendsTC,
	}),
	withAuthRedirect // то во что вкладывается сам компонент
)(UsersContainer)//сам компонент