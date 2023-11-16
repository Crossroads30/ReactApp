import React from 'react'
import { Field } from 'redux-form'
import cl from './FormElement.module.css'
import { FieldValidatorType } from '../../../../utils/validators/validators'

type FormControlParamsType = {
	input: React.FormEvent<HTMLInputElement>
	meta: {
		touched: boolean
		error: string
	}
	typeofelement: React.JSXElementConstructor<object> // ?????????
}

// export const FormElement = ({ input, meta, ...props }) => {
export const FormElement: React.FC<FormControlParamsType> = ({ input, meta: { touched, error }, ...props }) => {
	//используем диструктуризацию для meta.touched и meta.error
	//шаблонный вариант передачи нужного элемента что бы избежать дублирования кода для различных элементов формы
	// const hasError = meta.touched && meta.error
	const hasError = touched && error //используем диструктуризацию для meta.touched и meta.error

	return (
		<div className={cl.formControl + ' ' + (hasError ? cl.error : '')}>
			<div>
				<props.typeofelement {...input} {...props} />
				{/* props.typeofelement - кастомный атрибут(не camelCase т.к. реакт ругается на него) */}
				{/* передаем в самой форме в 'Field': сам компонент -> (component={FormElement}) и нужный элемент с помощью -> (typeofelement='<названия элемента>') например: <Field  component={FormElement} typeofelement='input'> */}
			</div>
			{/* {hasError && <span>{meta.error}</span>} */}
			{hasError && <span>{error}</span>}
			{/* //используем диструктуризацию для meta.error */}
		</div>
	)
}

// вместо описанных типов ниже, создан Generic 
// версия без Generic:

// export type FormDataValuesType = {
// 	email: string
// 	password: string
// 	rememberMe: boolean
// 	captcha: string | null
// }

// type FormDataValuesTypeKeys = keyof FormDataValuesType // определяет тип пропса(name) по ключам из FormDataValuesType

// Generic не работает с синтаксисом стрелочной функции !!!!
// export const createField = (
// 	className: string | undefined,
// 	placeholder: string | undefined,
// 	name: FormDataValuesTypeKeys, // определяет тип пропса(name) по ключам из FormDataValuesType
// 	validate: Array<FieldValidatorType> | null,
// 	typeofelement: string,
// 	props = {},
// 	text = ''
// ) => (
// 		<div className={className}>
// 			<Field placeholder={placeholder} name={name} validate={validate} component={FormElement} typeofelement={typeofelement} {...props} />
// 			{text}
// 		</div>
// 	)

// версия с Generic:
// Generic не работает с синтаксисом стрелочной функции, поэтому переписываем стрелочную ф-ю в обычную:
export function createField<FormKeysType extends string>( // Generic <FormKeysType> который передается в LoginForm (extends string - это ограничения того что этот ключ должен быть строкой)
	className: string | undefined,
	placeholder: string | undefined,
	name: FormKeysType, // определяет тип пропса(name) по ключам из FormDataValuesType
	validate: Array<FieldValidatorType> | null,
	typeofelement: string,
	props = {},
	text = ''
) {
	return (
		<div className={className}>
			<Field placeholder={placeholder} name={name} validate={validate} component={FormElement} typeofelement={typeofelement} {...props} />
			{text}
		</div>
	)
}
