import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../BLL/react-redux/reducers/react-redux-store'

//state для ConnectedAuthRedirectComponent
const setStateToPropsForRedirect = (state: AppStateType) => ({
		isAuth: state.auth.isAuth
} as MapPropsType)

type MapPropsType = {
	isAuth: boolean
}

type DispatchPropsType = {

}

// WCP - WrappedComponentProps
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<React.JSX.IntrinsicAttributes>) {
	const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = props => {
		//если нет аутентификации происходит переход на 'loginPage'
		let { isAuth, ...restProps } = props // сделали диструктуризацию что бы 'isAuth' был отдельно от остальных пропсов
		if (!isAuth) {
			return <Navigate to='/login' />
		}
		return <WrappedComponent {...restProps } />
	}

	//connect для ConnectedAuthRedirectComponent
	const ConnectedAuthRedirectComponent = connect(setStateToPropsForRedirect)(RedirectComponent)
	return ConnectedAuthRedirectComponent
}
