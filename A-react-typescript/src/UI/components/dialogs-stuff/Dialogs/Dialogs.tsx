import cl from './Dialogs.module.css'
import DialogItem from '../DialogItem/DialogItem'
import DialogMessage from '../DialogMessage/DialogMessage'
import React from 'react'
import { DialogsReduxForm } from './DialogsForm'
import { DialogsType, MessagesType } from '../../../../types/types'

type OwnPropsType = {
	addMessage: (messageText: string | undefined) => void
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
}

export type NewMassageFormValuesType = {
	newMessageText: string 
}

const Dialogs: React.FC<OwnPropsType> = props => {
	const dialogItems = props.dialogs.map(dialog => (
		<div className={cl.avatar} key={dialog.id}>
			<div className={cl.image}></div>
			<DialogItem name={dialog.name} id={dialog.id} />
		</div>
	))

	const DialogMessages = props.messages.map(message => <DialogMessage message={message.message} id={message.id} key={message.id} />)

	const addNewMessage = (formData: NewMassageFormValuesType) => {
		const newMessageBody = formData.newMessageText
		props.addMessage(newMessageBody)
	}

	return (
		<div className={cl.dialogsWrapper}>
			<div className={cl.dialogs}>
				<ul className={cl.dialogsItems}>{dialogItems}</ul>
				<div className={cl.messages}>{DialogMessages}</div>
			</div>
			<DialogsReduxForm onSubmit={addNewMessage} />
		</div>
	)
}

export default Dialogs
