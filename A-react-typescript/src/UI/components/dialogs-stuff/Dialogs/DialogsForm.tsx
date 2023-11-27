import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from '../../../../utils/validators/validators'
import { FormElement, createField } from '../../common/FormsControls/FormElement'
import { NewMassageFormValuesType } from './Dialogs'

const maxLength100 = maxLengthCreator(100) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

type NewMessageFormValuesTypeKeys = Extract<keyof NewMassageFormValuesType, string>

type PropsType = {}

const DialogsForm: React.FC<InjectedFormProps<NewMassageFormValuesType, PropsType> & PropsType> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* обработчик данных из redux-form по умолчанию */}
			{createField<NewMessageFormValuesTypeKeys>(undefined, 'enter your message...', 'newMessageText', [required, maxLength100], 'textarea')}
			{/* <Field
				component={FormElement} //передаем т.н. шаблонный компонент
				typeofelement='textarea' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
				name='newMessageText'
				placeholder='  enter your message...'
				validate={[required, maxLength100]}
			/> */}
			<button>send</button>
		</form>
	)
}

export const DialogsReduxForm = reduxForm<NewMessageFormValuesTypeKeys | any>({
	// a unique name for the form
	form: 'dialogs',
})(DialogsForm)

// export default DialogsForm
