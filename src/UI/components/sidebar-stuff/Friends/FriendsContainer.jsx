import Friends from './Friends'
import { connect } from 'react-redux'

const setStateToProps = state => {
	return {
		friends: state.sidebar.friends
	}
}

// const setDispatchTpProps = dispatch => {
// 	return {}
// }

const FriendsContainer = connect(setStateToProps)(Friends)

export default FriendsContainer
