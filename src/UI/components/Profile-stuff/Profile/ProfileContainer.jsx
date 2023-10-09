import Profile from './Profile'
import React from 'react'
import {
	getUserProfile,
	getStatus,
	updateStatus,
} from '../../../../BLL/react-redux/reducers/profile-reducer'
import { connect } from 'react-redux'
import { withRouter } from './HookWithRoute'
import { compose } from 'redux'
// import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'

class ProfileContainer extends React.Component {
	componentDidMount() {
		// debugger
		let profileId = this.props.match.params.userId
		if (!profileId) {
			// profileId = 30064
			profileId = this.props.authorizedUserId
			if(!profileId) {
				window.location.href = 'login'// пока очень корявое решение
			}
		}
		this.props.getUserProfile(profileId)
		this.props.getStatus(profileId)
	}

	render() {
		return (
			<Profile
				{...this.props}
				userProfile={this.props.userProfile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				mainUserId={this.props.mainUserId}
			/>
		)
	}
}

const setStateToProps = state => {
	return {
		userProfile: state.profilePage.userProfile,
		status: state.profilePage.status,
		authorizedUserId: state.auth.id,
		isAuth: state.auth.isAuth,
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
export default compose(
	connect(setStateToProps, {
		getUserProfile,
		getStatus,
		updateStatus,
	}), //все что ниже вкладывается в connect
	withRouter, //экспортируем функцию обертку 'withRouter' из ./HookWithRoute в которую вкладывается withAuthRedirect с ProfileContainer внутри
	// withAuthRedirect, // то во что вкладывается сам компонент(перенаправление на логин)
)(ProfileContainer) //сам компонент

// export default connect(setStateToProps, { setUserProfile })(ProfileContainer)// без withRouter
