import { LoginReduxForm } from '../LoginForm/LoginForm'
import cl from './LoginPage.module.css'

const LoginPage = () => {

	const onSubmit = (formData) => {
		console.log(formData)
	}

	return (
		<div className={cl.loginWrapper}>
			<h1 className={cl.loginTitle}>Login Page</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	)
}

export default LoginPage
