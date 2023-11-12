import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

//state для ConnectedAuthRedirectComponent
const setStateToPropsForRedirect = state => {
	return {
		isAuth: state.auth.isAuth,
	}
}

export const withAuthRedirect = Component => {
	class RedirectComponent extends React.Component {
		render() {
			//если нет аутентификации происходит переход на 'loginPage'
			if (!this.props.isAuth) {
				return <Navigate to='/login' />
			}
			return <Component {...this.props} />
		}
	}

	//connect для ConnectedAuthRedirectComponent
	const ConnectedAuthRedirectComponent = connect(setStateToPropsForRedirect)(
		RedirectComponent
	)
	return ConnectedAuthRedirectComponent
}
