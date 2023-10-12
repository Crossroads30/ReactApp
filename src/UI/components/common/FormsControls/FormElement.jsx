import { Field } from 'redux-form'
import cl from './FormElement.module.css'

export const FormElement = ({ input, meta, ...props }) => {
	//шаблонный вариант передачи нужного элемента что бы избежать дублирования кода для различных элементов формы
	const hasError = meta.touched && meta.error

	return (
		<div className={cl.formControl + ' ' + (hasError ? cl.error : '')}>
			<div>
				<props.typeofelement {...input} {...props} />
				{/* props.typeofelement - кастомный атрибут(не camelCase т.к. реакт ругается на него) */}
				{/* передаем в самой форме в 'Field': сам компонент -> (component={FormElement}) и нужный элемент с помощью -> (elementType='<названия элемента>') например: <Field  component={Element} elementType='input'> */}
			</div>
			{hasError && <span>{meta.error}</span>}
		</div>
	)
}

export const createField = (
	className,
	placeholder,
	name,
	validate,
	typeofelement,
	props = {},
	text = ''
) => {
	return (
		<div className={className}>
			<Field
				placeholder={placeholder}
				name={name}
				validate={validate}
				component={FormElement}
				typeofelement={typeofelement}
				{...props}
			/>
			{text}
		</div>
	)
}