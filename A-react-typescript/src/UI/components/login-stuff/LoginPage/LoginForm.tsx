import React from 'react'
import cl from './LoginPage.module.css'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { maxLengthCreator, required } from '../../../../utils/validators/validators.ts'
// import Input from '../../common/FormsControls/Input/Input'
import { GetStringKeys, createField } from '../../common/FormsControls/FormElement.tsx'
import { FormDataValuesType } from './LoginPage.tsx'

const maxLength30 = maxLengthCreator(30) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

type LoginFormOwnProps = {
	captchaURL: string | null
}

// вызываем generic GetStringKeys из FormElement.ts и передаем туда FormDataValuesType
type FormDataValuesTypeKeys = GetStringKeys<FormDataValuesType> // из ключей может быть только строка

// внутри React.FC<InjectedFormProps<FormDataValuesType -!!! LoginFormOwnProps !!!- указываем для библиотеки redux-form и после & указываем тот же !!! LoginFormOwnProps !!! для самой компоненты!!!
const LoginForm: React.FC<InjectedFormProps<FormDataValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaURL }) => {
	//используем диструктуризацию пропсов(не забываем про фигурные скобки, т.к. props - это объект)
	// debugger
	return (
		<div>
			{/* <form onSubmit={props.handleSubmit}> */}
			<form onSubmit={handleSubmit}>
				{/* используем диструктуризацию пропсов */}
				{/* вызываем шаблонизатор полей createField и передаем в него все необходимые параметры */}
				{/*  Generic <FormKeysType> который приходит из FormElement и в который подставляется данный тип FormDataValuesTypeKeys что берет ключи из FormDataValuesType */}
				{createField<FormDataValuesTypeKeys>(cl.email, 'Email', 'email', [required, maxLength30], 'input')}
				{createField<FormDataValuesTypeKeys>(cl.password, 'Password', 'password', [required, maxLength30], 'input', {
					type: 'password',
				})}
				{createField<FormDataValuesTypeKeys>(
					cl.checkbox,
					undefined,
					'rememberMe',
					null,
					'input',
					{
						type: 'checkbox',
					},
					'Remember me'
				)}
				{captchaURL && <img src={captchaURL} />}
				{/* если капча, то показываем img с этой капчей внутри(то что выше) и вводим эти символы в поле(то что ниже)(имя поля должно соответствовать тому полю что находится на сервере ) */}
				{captchaURL && createField<FormDataValuesTypeKeys>(undefined, 'Symbols from image', 'captcha', [required], 'input', {})}
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

export const LoginReduxForm = reduxForm<FormDataValuesType, LoginFormOwnProps>({
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
