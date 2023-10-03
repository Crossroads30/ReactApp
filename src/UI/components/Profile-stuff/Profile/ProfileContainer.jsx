import Profile from './Profile'
import React from 'react'
import { getUserProfile } from '../../../../BLL/react-redux/profile-reducer'
import { connect } from 'react-redux'
import { withRouter } from './HookWithRoute'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
	componentDidMount() {
		// debugger
		let profileId = this.props.match.params.userId
		if (!profileId) {
			profileId = 2
		}
		this.props.getUserProfile(profileId)
	}

	render() {
		return <Profile {...this.props} userProfile={this.props.userProfile} />
	}
}

const setStateToProps = state => {
	return {
		userProfile: state.profilePage.userProfile,
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
	connect(setStateToProps, { getUserProfile }),//все что ниже вкладывается в connect
	withRouter, //экспортируем функцию обертку 'withRouter' из ./HookWithRoute в которую вкладывается withAuthRedirect с ProfileContainer внутри
	withAuthRedirect // то во что вкладывается сам компонент
)(ProfileContainer)//сам компонент



// export default connect(setStateToProps, { setUserProfile })(ProfileContainer)// без withRouter
