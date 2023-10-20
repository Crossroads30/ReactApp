import { Navigate } from 'react-router-dom'
import { LoginReduxForm } from './LoginForm'
import cl from './LoginPage.module.css'

//используем диструктуризацию пропсов
// const LoginPage = props => {
const LoginPage = ({login, isAuth}) => {
	//используем диструктуризацию пропсов(не забываем про фигурные скобки, т.к. props - это объект)

	const addLogin = formData => {
		// console.log(formData)
		// props.login(formData.email, formData.password, formData.rememberMe)
		login(formData.email, formData.password, formData.rememberMe)
	}

	if (isAuth) {
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
