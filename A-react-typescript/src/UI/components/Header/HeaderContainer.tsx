import React from 'react'
import { connect } from 'react-redux'
import Header, { DispatchPropsType, MapPropsType } from './Header'
// import { getAuthUserData } from '../../../BLL/react-redux/auth-reducer'
import { logoutFromServer } from '../../../BLL/react-redux/reducers/auth-reducer'
import { AppStateType } from '../../../BLL/react-redux/reducers/react-redux-store'

// type MapStateType = {
// 	isAuth: boolean
// 	login: string
// }

// type DispatchStateType = {
// 	logoutFromServer: () => void
// }

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {
	// componentDidMount() {
	// 	this.props.getAuthUserData() //получение данных о аутентификации перенесены в App
	// }

	render() {
		return <Header {...this.props} logoutFromServer={this.props.logoutFromServer} />
	}
}

const setStateToProps = (state: AppStateType) => {
	return {
		isAuth: state.auth.isAuth,
		login: state.auth.login,
	} 
}

export default connect<MapPropsType, {}, DispatchPropsType, AppStateType>(setStateToProps, { logoutFromServer })(HeaderContainer)
// export default connect(setStateToProps, { getAuthUserData, logoutFromServer })(
// 	HeaderContainer //получение данных о аутентификации(getAuthUserData) перенесены в App
// )
