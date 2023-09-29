import React from 'react'
import { connect } from 'react-redux'
import { setAuthUserData } from '../../../BLL/react-redux/auth-reducer'
import Header from './Header'
import { userApi } from '../../../DAL/api/api'

class HeaderContainer extends React.Component {
	componentDidMount() {
		userApi
			.getAuth()
			.then(data => {
				const { id, email, login } = data
				data.resultCode === 0 && this.props.setAuthUserData(id, email, login)
				// debugger
				// console.log(response)
			})
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

export default connect(setStateToProps, { setAuthUserData })(HeaderContainer)
