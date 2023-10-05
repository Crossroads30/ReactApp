import cl from './LoginPage.module.css'
import { Field, reduxForm } from 'redux-form'
import {
	maxLengthCreator,
	required,
} from '../../../../utils/validators/validators'
// import Input from '../../common/FormsControls/Input/Input'
import { FormElement } from '../../common/FormsControls/FormElement'

const maxLength30 = maxLengthCreator(30) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

const LoginForm = props => {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<div className={cl.login}>
					<Field
						component={FormElement} //передаем т.н. шаблонный компонент
						typeofelement='input' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
						placeholder='Login'
						name='login'
						// component={Input}
						validate={[required, maxLength30]}
					/>
				</div>
				<div className={cl.password}>
					<Field
						component={FormElement}
						typeofelement='input'
						placeholder='Password'
						name='password'
						// component={Input}
						validate={[required, maxLength30]}
					/>
				</div>
				<div className={cl.email}>
					<Field
						component={FormElement}
						typeofelement='input'
						placeholder='Email'
						name='email'
						// component={Input}
						validate={[required, maxLength30]}
					/>
				</div>
				<div className={cl.checkbox}>
					<Field
						component={FormElement}
						typeofelement='input'
						name='remember-me'
						type='checkbox' //тип инпута
						// component={Input}
					/>
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
