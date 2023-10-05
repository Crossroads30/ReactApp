import { maxLengthCreator, required } from '../../../../utils/validators/validators'
import cl from './Posts.module.css'
import { Field, reduxForm } from 'redux-form'

const maxLength10 =  maxLengthCreator(10)

const PostsForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* обработчик данных из redux-form по умолчанию */}
			<div className={cl.textWrapper}>
				<Field
					className={cl.newPost}
					component={'textarea'}
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
