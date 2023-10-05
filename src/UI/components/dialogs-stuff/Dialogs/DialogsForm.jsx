import { Field, reduxForm } from 'redux-form'
import {
	required,
	maxLengthCreator,
} from '../../../../utils/validators/validators'
import { FormElement } from '../../common/FormsControls/FormElement'

const maxLength100 = maxLengthCreator(100) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

const DialogsForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* обработчик данных из redux-form по умолчанию */}
			<Field
				component={FormElement} //передаем т.н. шаблонный компонент
				typeofelement='textarea' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
				name='newMessageText'
				placeholder='  enter your message...'
				validate={[required, maxLength100]}
			/>
			<button>send</button>
		</form>
	)
}

export const DialogsReduxForm = reduxForm({
	// a unique name for the form
	form: 'dialogs',
})(DialogsForm)

export default DialogsForm
