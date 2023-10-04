import React from 'react'
import { connect } from 'react-redux'
import LoginPage from './LoginPage'

class LoginPageContainer extends React.Component {
	componentDidMount() {}

	render() {
		return <LoginPage />
	}
}

const setStateToProps = state => {
	return {}
}

export default connect(setStateToProps, {})(LoginPageContainer)
