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
	typeofelement: any
}

type FormControlType = (params:FormControlParamsType) => React.ReactNode

// export const FormElement = ({ input, meta, ...props }) => {
export const FormElement: FormControlType = ({ input, meta: { touched, error }, ...props }) => {
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

export const createField = (className: string | undefined, placeholder: string | undefined, name: string | undefined, validate: Array<FieldValidatorType> | null, typeofelement: string, props = {}, text = '') => {
	return (
		<div className={className}>
			<Field placeholder={placeholder} name={name} validate={validate} component={FormElement} typeofelement={typeofelement} {...props} />
			{text}
		</div>
	)
}