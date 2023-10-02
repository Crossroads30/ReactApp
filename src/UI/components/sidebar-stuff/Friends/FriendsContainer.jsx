import React from 'react'
import Friends from './Friends'
import { connect } from 'react-redux'
import { getFriendsTC } from '../../../../BLL/react-redux/sidebar-reducer'

class FriendsContainer extends React.Component {
	componentDidMount() {
		this.props.getFriendsTC(this.props.totalUsersCount)
		//этот колбэк(getFriendsTC) передает эти параметры в thunkCreator
	}

	render() {
		return (
			<Friends
				friends={this.props.friends}
			/>
		)
	}
}

const setStateToProps = state => {
	return {
		friends: state.sidebar.friends,
		totalUsersCount: state.sidebar.totalUsersCount,
	}
}


export default connect(setStateToProps, {
	getFriendsTC,
})(FriendsContainer)
