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
	// debugger
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
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
				<div className={cl.password}>
					<Field
						component={FormElement} //передаем т.н. шаблонный компонент
						typeofelement='input' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
						placeholder='Password'
						name='password'
						type='password'
						// component={Input}
						validate={[required, maxLength30]}
					/>
				</div>
				<div className={cl.checkbox}>
					<Field
						component={FormElement}
						typeofelement='input'
						name='rememberMe'
						type='checkbox' //тип инпута
						// component={Input}
					/>
					<span>Remember me</span>
				</div>
				<div className={cl.button}>
					<button>Login</button>
				</div>
				{ props.error && <div className={cl.formSummaryError}>{props.error}</div>}
			</form>
		</div>
	)
}

export const LoginReduxForm = reduxForm({
	// a unique name for the form
	form: 'login',
})(LoginForm)

export default LoginForm
