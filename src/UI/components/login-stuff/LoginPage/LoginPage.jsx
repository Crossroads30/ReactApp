import { Navigate } from 'react-router-dom'
import { LoginReduxForm } from './LoginForm'
import cl from './LoginPage.module.css'

const LoginPage = props => {
	// debugger
	const addLogin = formData => {
		console.log(formData)
		props.login(formData.email, formData.password, formData.rememberMe)
	}

	if (props.isAuth) {
		return <Navigate to='/profile' />
	}
	return (
		<div className={cl.loginWrapper}>
			<h1 className={cl.loginTitle}>Login Page</h1>
			<LoginReduxForm onSubmit={addLogin} />
		</div>
	)
}

export default LoginPage
