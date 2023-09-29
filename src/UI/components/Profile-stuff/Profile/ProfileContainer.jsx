import Profile from './Profile'
import React from 'react'
import { setUserProfile } from '../../../../BLL/react-redux/profile-reducer'
import { connect } from 'react-redux'
import { withRouter } from './HookWithRoute'
import { userApi } from '../../../../DAL/api/api'

class ProfileContainer extends React.Component {
	componentDidMount() {
		// debugger
		let profileId = this.props.match.params.userId
		if (!profileId) {
			profileId = 2
		}
		userApi
			.getProfile(profileId)
			.then(data => {
				// console.log(response)
				// console.log(profileId)
				this.props.setUserProfile(data)
			})
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

const WithUrlDataContainerComponent = withRouter(ProfileContainer) //экспортируем функцию обертку 'withRouter' из ./HookWithRoute

export default connect(setStateToProps, { setUserProfile })(
	WithUrlDataContainerComponent // передаем ее в connect что бы получить данные из строки браузера
)
// export default connect(setStateToProps, { setUserProfile })(ProfileContainer)