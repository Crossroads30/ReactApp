import React from 'react'
import { connect } from 'react-redux'
import LoginPage from './LoginPage.tsx'
import {loginToServer} from '../../../../BLL/react-redux/reducers/auth-reducer.ts'
import { AppStateType } from '../../../../BLL/react-redux/reducers/react-redux-store.ts'

type MapStatePropsType = {
	//пропсы которые приходят из MapStateToProps(данные)
	captchaURL: string | null
	isAuth: boolean
}

type MapDispatchPropsType = {
	//пропсы которые приходят из MapDispatchToProps(колбэки)
	loginToServer: (email: string, password: string, rememberMe: boolean, captcha: string | null) => Promise<void>
}


type PropsType = MapStatePropsType & MapDispatchPropsType

class LoginPageContainer extends React.Component<PropsType> {
	componentDidMount() {}

	render() {
		return <LoginPage login={this.props.loginToServer} isAuth={this.props.isAuth} captchaURL={this.props.captchaURL} />
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		captchaURL: state.auth.captchaURL,
		isAuth: state.auth.isAuth,
	}
}
//no_state = {}, TDispatchProps = {}, TOwnProps = {}
export default connect(mapStateToProps, { loginToServer })(LoginPageContainer)
