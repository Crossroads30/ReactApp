import Profile from './Profile.jsx'
import React from 'react'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveUserData } from '../../../../BLL/react-redux/reducers/profile-reducer'
import { connect } from 'react-redux'
import { withRouter } from './HookWithRoute'
import { compose } from 'redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { AppStateType } from '../../../../BLL/react-redux/reducers/react-redux-store'
import { ProfileType } from '../../../../types/types'

type MapPropsType = ReturnType<typeof setStateToProps>

type DispatchPropsType = {
	getUserProfile: (profileId: number) => void
	getStatus: (profileId: number) => void
	updateStatus: (status: string) => void
	savePhoto: (file: File) => void
	saveUserData: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
	match: { params: { userId: string } }
}

type PropsType = MapPropsType & DispatchPropsType & PathParamsType

class ProfileContainer extends React.Component<PropsType> {
	refreshProfile() {
		const { match, authorizedUserId, getUserProfile, getStatus } = this.props
		let profileId: number | null = +match.params.userId //т.к. в match.params всегда должна быть строка, '+' как бы приводим эту строку к числу(тогда TS не ругается на profileId )
		if (!profileId) {
			// profileId = 30064
			profileId = authorizedUserId
			// if (!profileId) {
			// 	window.location.href = 'login' // пока очень корявое решение
			// }
		}
		if (!profileId) {
			console.error('ID should exists in URL params or in state ("authorizedUserId")')
		} else {
			getUserProfile(profileId)
			getStatus(profileId)
		}
	}

	componentDidMount() {
		this.refreshProfile()
	}
	//метод аналогичен useEffect(), если что-то меняется, то тогда обновляем отрисовку компоненты, в данном случае что бы при клике на страничку profile, после того как мы просмотрели чужой профиль на страничке users, отображался наш собственный профиль
	componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
		this.props.match.params.userId != prevProps.match.params.userId && this.refreshProfile()
	}

	render() {
		return (
			<Profile
				{...this.props}
				isOwner={!this.props.match.params.userId} // отрицание приводит параметр из псевдо истины в булевое значение т.е. в false(если нет чужого id, значит я этот самый owner)
				userProfile={this.props.userProfile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				savePhoto={this.props.savePhoto}
				saveUserData={this.props.saveUserData}
				// userDataStatus={this.props.userDataStatus}
			/>
		)
	}
}

const setStateToProps = (state: AppStateType) => {
	return {
		userProfile: state.profilePage.userProfile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.id,
		isAuth: state.auth.isAuth,
		// userDataStatus: state.profilePage.userDataStatus,
	}
}

//---------------------------------------------------------------
// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) //экспортируем функцию обертку 'withRouter' из ./HookWithRoute

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

// export default connect(setStateToProps, { getUserProfile })(
// 	WithUrlDataContainerComponent // передаем ее в connect что бы получить данные из строки браузера
// )
//---------------------------------------------------------------

//вместо того что выше:
// экспортируем по умолчанию функцию “конвейер” в которую передаются другие функции в которые по цепочке вкладываются как бы друг в друга с определенным компонентом в основании:
export default compose<React.ComponentType>(
	connect(setStateToProps, {
		getUserProfile,
		getStatus,
		updateStatus,
		savePhoto,
		saveUserData,
	}), //все что ниже вкладывается в connect
	withRouter, //экспортируем функцию обертку 'withRouter' из ./HookWithRoute в которую вкладывается withAuthRedirect с ProfileContainer внутри
	withAuthRedirect // то во что вкладывается сам компонент(перенаправление на логин)
)(ProfileContainer) //сам компонент

// export default connect(setStateToProps, { setUserProfile })(ProfileContainer)// без withRouter
