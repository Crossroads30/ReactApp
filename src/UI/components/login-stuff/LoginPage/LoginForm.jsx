import cl from './LoginPage.module.css'
import { Field, reduxForm } from 'redux-form'

const LoginForm = (props) => {
  return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<div className={cl.login}>
					<Field placeholder='Login' name='login' component={'input'} />
				</div>
				<div className={cl.password}>
					<Field placeholder='Password' name='password' component={'input'} />
				</div>
				<div className={cl.email}>
					<Field placeholder='Email' name='email' component={'input'} />
				</div>
				<div className={cl.checkbox}>
					<Field type='checkbox' name='remember-me' component={'input'} />
					Remember me
				</div>
				<div className={cl.button}>
					<button>Login</button>
				</div>
			</form>
		</div>
	)
}

export const LoginReduxForm = reduxForm({
	// a unique name for the form
	form: 'login',
})(LoginForm)

export default LoginForm