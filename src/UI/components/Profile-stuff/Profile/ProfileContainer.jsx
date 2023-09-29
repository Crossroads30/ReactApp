import Profile from './Profile'
import React from 'react'
import axios from 'axios'
import { setUserProfile } from '../../../../BLL/react-redux/profile-reducer'
import { connect } from 'react-redux'
import { withRouter } from './HookWithRoute'

class ProfileContainer extends React.Component {
	componentDidMount() {
		// debugger
		let profileId = this.props.match.params.userId
		if (!profileId) {
			profileId = 2
		}
			axios
				.get(
					`https://social-network.samuraijs.com/api/1.0/profile/` + profileId
				)

				.then(response => {
					// console.log(response)
					// console.log(profileId)
					this.props.setUserProfile(response.data)
				})
	}

	// getId() {
	// 	
	// 	return console.log(profileId)
	// }

	render() {
		return <Profile {...this.props} userProfile={this.props.userProfile} />
	}
}



const setStateToProps = state => {
	return {
		userProfile: state.profilePage.userProfile,
	}
}

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

// export default connect(setStateToProps, { setUserProfile })(ProfileContainer)
export default connect(setStateToProps, { setUserProfile })(
	WithUrlDataContainerComponent
)
