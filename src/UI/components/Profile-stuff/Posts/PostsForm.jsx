import {
	maxLengthCreator,
	required,
} from '../../../../utils/validators/validators'
import cl from './Posts.module.css'
import { Field, reduxForm } from 'redux-form'
import { FormElement } from '../../common/FormsControls/FormElement'

const maxLength10 = maxLengthCreator(10) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

const PostsForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* props.handleSubmit обработчик данных из redux-form по умолчанию */}
			<div className={cl.textWrapper}>
				<Field
					component={FormElement} //вызываем т.н. шаблонный компонент
					typeofelement='textarea' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
					className={cl.newPost}
					name='newPostText'
					placeholder='  enter your news...'
					validate={[required, maxLength10]}
				/>
				<button>send</button>
			</div>
		</form>
	)
}

export const PostsReduxForm = reduxForm({
	// a unique name for the form
	form: 'posts',
})(PostsForm)

export default PostsForm
