import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
// import { getAuthUserData } from '../../../BLL/react-redux/auth-reducer'
import { logoutFromServer } from '../../../BLL/react-redux/reducers/auth-reducer'

class HeaderContainer extends React.Component {
	// componentDidMount() {
	// 	this.props.getAuthUserData() //получение данных о аутентификации перенесены в App
	// }

	render() {
		return <Header {...this.props} logout={this.props.logoutFromServer} />
	}
}

const setStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	}
}

export default connect(setStateToProps, { logoutFromServer })(
	HeaderContainer
)
// export default connect(setStateToProps, { getAuthUserData, logoutFromServer })(
// 	HeaderContainer //получение данных о аутентификации(getAuthUserData) перенесены в App
// )
