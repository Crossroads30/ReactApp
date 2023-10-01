import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { getAuthUserData } from '../../../BLL/react-redux/auth-reducer'

class HeaderContainer extends React.Component {
	componentDidMount() {
		this.props.getAuthUserData()
	}

	render() {
		return <Header {...this.props} />
	}
}

const setStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}
}

export default connect(setStateToProps, { getAuthUserData })(HeaderContainer)
