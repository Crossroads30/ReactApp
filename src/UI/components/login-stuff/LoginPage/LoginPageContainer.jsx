import React from 'react'
import { connect } from 'react-redux'
import LoginPage from './LoginPage'
import {loginToServer} from '../../../../BLL/react-redux/auth-reducer'

class LoginPageContainer extends React.Component {
	componentDidMount() {}

	render() {
		return <LoginPage login={this.props.loginToServer} isAuth={this.props.isAuth}/>
	}
}

const setStateToProps = state => { 
	return {
		isAuth: state.auth.isAuth
	} 
}

export default connect(setStateToProps, { loginToServer })(LoginPageContainer)

// export default connect(null, {loginToServer})(LoginPageContainer) //если  из state ничего не передаём, поэтому в connect пишем null
