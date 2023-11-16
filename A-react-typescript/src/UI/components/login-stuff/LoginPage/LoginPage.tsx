import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginReduxForm } from './LoginForm.tsx'
import cl from './LoginPage.module.css'

export type LoginPageType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
	isAuth: boolean
	captchaURL: string | null
}

export type FormDataValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string | null
}

const LoginPage: React.FC<LoginPageType> = ({ login, isAuth, captchaURL }) => {
	//используем диструктуризацию пропсов(не забываем про фигурные скобки, т.к. props - это объект)

	const addLogin = (formData: FormDataValuesType) => {
		// console.log(formData)
		// props.login(formData.email, formData.password, formData.rememberMe)
		login(formData.email, formData.password, formData.rememberMe, formData.captcha)
	}

	if (isAuth) {
		return <Navigate to='/profile' />
	}
	return (
		<div className={cl.loginWrapper}>
			<h1 className={cl.loginTitle}>Login Page</h1>
			<LoginReduxForm onSubmit={addLogin} captchaURL={captchaURL} />
		</div>
	)
}

export default LoginPage
