import Profile from './Profile'
import React from 'react'
import axios from 'axios'
import { setUserProfile } from '../../../react-redux/profile-reducer'
import { connect } from 'react-redux'

class ProfileContainer extends React.Component {
	componentDidMount() {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)

			.then(response => {
				console.log(response)
				this.props.setUserProfile(response.data)
			})
	}

	render() {
		return <Profile {...this.props} userProfile={this.props.userProfile}/>
	}
}

// export default ProfileContainer
const setStateToProps = state => {
	return {
		userProfile: state.profilePage.userProfile,
	}
}

export default connect(setStateToProps, {
	setUserProfile,
})(ProfileContainer)
