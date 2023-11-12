import { reduxForm } from "redux-form"
import { createField } from "../../common/FormsControls/FormElement"
import cl from './User.module.css'

const UserDataForm = ({ handleSubmit, userProfile, error }) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<b>Full Name:</b>
				{createField(null, 'Full name', 'fullName', [], 'input')}
				{/* 3й пункт(name) здесь должен соответствовать названию того поля из объекта на сервере что мы хотим изменить(fullName) */}
				<b>Looking For A Job ?</b>
				{createField(null, 'Looking For A Job', 'lookingForAJob', [], 'input', {
					type: 'checkbox',
				})}
				<b>My Skills:</b>
				{createField(null, 'My Skills', 'lookingForAJobDescription', [], 'textarea')}
				<b>About Me:</b>
				{createField(null, 'About Me', 'aboutMe', [], 'textarea')}
				{/* {error && <div className={cl.formSummaryError}>{error}</div>} */}
				<ul className={cl.contacts}>
					{Object.keys(userProfile.contacts).map(key => {
						return (
							<li key={key}>
								<div>
									<b className={cl.key}>{key}:</b>
									{createField(null, key, 'contacts.' + key, [], 'input')}
								</div>
							</li>
						)
					})}
				</ul>
				{error && (
					<>
						{error.map(el => {
							return <div className={cl.formSummaryError}>{el}</div>
						})}
					</>
				)}
				<div className={cl.button}>
					<button>Save</button>
				</div>
			</form>
		</div>
	)
}

export const EditReduxForm = reduxForm({// создаем контейнерную компоненту с помощью HOC Redux Form
	// a unique name for the form
	form: 'edit-profile',
})(UserDataForm)

export default UserDataForm
