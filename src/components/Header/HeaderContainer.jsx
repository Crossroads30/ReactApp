import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuthUserData } from '../../react-redux/auth-reducer'
import Header from './Header'

class HeaderContainer extends React.Component {
	componentDidMount() {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
			.then(response => {
        const { id, email, login } = response.data.data
        response.data.resultCode === 0 &&
        this.props.setAuthUserData(id, email, login)
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
