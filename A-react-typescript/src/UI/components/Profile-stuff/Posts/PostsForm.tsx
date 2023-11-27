import { maxLengthCreator, required } from '../../../../utils/validators/validators'
import cl from './Posts.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { GetStringKeys, createField } from '../../common/FormsControls/FormElement'
import React from 'react'

const maxLength10 = maxLengthCreator(10) //вызов этой функции необходимо вызывать за пределами компоненты иначе будет бесконечный цикл!

type PropsType = {}

export type AddPostFormValuesType = {
	newPostText: string | undefined
} 

// type FormDataValuesTypeKeys = Extract<keyof AddPostFormValuesType, string>
//вместо типа выше вызываем generic GetStringKeys из FormElement.ts и передаем туда AddPostFormValuesType
type FormDataValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const PostsForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* props.handleSubmit обработчик данных из redux-form по умолчанию */}
			<div className={cl.textWrapper}>
				{createField<FormDataValuesTypeKeys>(cl.newPost, 'enter your news...', 'newPostText', [required, maxLength10], 'textarea')}

				<button>send</button>
			</div>
		</form>
	)
}

export const PostsReduxForm = reduxForm<AddPostFormValuesType, PropsType>({
	// a unique name for the form
	form: 'posts',
})(PostsForm)

export default PostsForm

//---------------------------------
//поле без 'createField'
/* <Field
	component={FormElement} //вызываем т.н. шаблонный компонент
	typeofelement='textarea' //передаем названия элемента этого компонента в кастомный атрибут(не camelCase т.к. реакт ругается на него)
	className={cl.newPost}
	name='newPostText'
	placeholder='  enter your news...'
	validate={[required, maxLength10]}
	/> */
