import cl from './LoginPage.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../../utils/validators/validators'
// import Input from '../../common/FormsControls/Input/Input'
import { FormElement, createField } from '../../common/FormsControls/FormElement'

const maxLength30 = maxLengthCreator(30) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

// const LoginForm = (props) => {
const LoginForm = ({ handleSubmit, error }) => {
	//используем диструктуризацию пропсов(не забываем про фигурные скобки, т.к. props - это объект)
	// debugger
	return (
		<div>
			{/* <form onSubmit={props.handleSubmit}> */}
			<form onSubmit={handleSubmit}>
				{/* используем диструктуризацию пропсов */}
				{/* вызываем шаблонизатор полей createField и передаем в него все необходимые параметры */}
				{createField(cl.email, 'Email', 'email', [required, maxLength30], 'input')}
				{createField(cl.password, 'Password', 'password', [required, maxLength30], 'input', { type: 'password' })}
				{createField(
					cl.checkbox,
					null,
					'rememberMe',
					null,
					'input',
					{
						type: 'checkbox',
					},
					'Remember me'
				)}
				<div className={cl.button}>
					<button>Login</button>
				</div>
				{/* {props.error && ( */}
				{error && (
					<div className={cl.formSummaryError}>{error}</div>
					/* используем диструктуризацию пропсов */
					/* <div className={cl.formSummaryError}>{props.error}</div> */
				)}
			</form>
		</div>
	)
}

export const LoginReduxForm = reduxForm({
	// a unique name for the form
	form: 'login',
})(LoginForm)

export default LoginForm

// стандартный код без шаблонизатора createField
{
	/* <div className={cl.email}>
					<Field
						component={FormElement} //передаем т.н. шаблонный компонент
						typeofelement='input' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
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
						component={FormElement} //передаем т.н. шаблонный компонент
						typeofelement='input' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
						name='rememberMe'
						type='checkbox' //тип инпута
						// component={Input}
					/>
					<span>Remember me</span>
				</div> */
}
