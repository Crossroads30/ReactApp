import { Field, reduxForm } from 'redux-form'

const DialogsForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>{/* обработчик данных из redux-form по умолчанию */}
				<Field
					component={'textarea'}
					name='newMessageText'
					placeholder='  enter your message...'
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
