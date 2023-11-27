import { InjectedFormProps, reduxForm } from "redux-form"
import { GetStringKeys, createField } from "../../common/FormsControls/FormElement"
import cl from './User.module.css'
import React, { FC } from "react"
import { ProfileType } from "../../../../types/types"

type PropsType = {
	userProfile: ProfileType
}

type ErrorMapType = {
	map: Function
}

type UserFormValuesKeys = GetStringKeys<ProfileType>

const UserDataForm: React.FC<InjectedFormProps<ProfileType, PropsType, ErrorMapType> & PropsType> = ({ handleSubmit, userProfile, error }) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<b>Full Name:</b>
				{createField<UserFormValuesKeys>(undefined, 'Full name', 'fullName', [], 'input')}
				{/* 3й пункт(name) здесь должен соответствовать названию того поля из объекта на сервере что мы хотим изменить(fullName) */}
				<b>Looking For A Job ?</b>
				{createField<UserFormValuesKeys>(undefined, 'Looking For A Job', 'lookingForAJob', [], 'input', {
					type: 'checkbox',
				})}
				<b>My Skills:</b>
				{createField<UserFormValuesKeys>(undefined, 'My Skills', 'lookingForAJobDescription', [], 'textarea')}
				<b>About Me:</b>
				{createField<UserFormValuesKeys>(undefined, 'About Me', 'aboutMe', [], 'textarea')}
				{/* {error && <div className={cl.formSummaryError}>{error}</div>} */}
				<ul className={cl.contacts}>
					{Object.keys(userProfile.contacts).map(key => {
						return (
							<li key={key}>
								<div>
									<b className={cl.key}>{key}:</b>
									{createField(undefined, key, 'contacts.' + key, [], 'input')}
									{/*????? по типизации ??????*/}
								</div>
							</li>
						)
					})}
				</ul>
				{error && (
					<>
						{error.map((el: string) => {
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

export const EditReduxForm = reduxForm<ProfileType, PropsType, ErrorMapType>({
	// создаем контейнерную компоненту с помощью HOC Redux Form
	// a unique name for the form
	form: 'edit-profile',
})(UserDataForm)

export default UserDataForm
