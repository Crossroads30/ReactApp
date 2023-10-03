import cl from './Dialogs.module.css'
import DialogItem from '../DialogItem/DialogItem'
import DialogMessage from '../DialogMessage/DialogMessage'
import React from 'react'
import { Navigate } from 'react-router-dom'

const Dialogs = props => {
	
	const dialogItems = props.dialogs.map(dialog => (
		<div className={cl.avatar} key={dialog.id}>
			<div className={cl.image}></div>
			<DialogItem name={dialog.name} id={dialog.id} />
		</div>
	))

	const DialogMessages = props.messages.map(message => (
		<DialogMessage message={message.message} id={message.id} key={message.id} />
	))

	const onMessageTextChange = event => {
		const message = event.target.value // вместо React.createRef() добавляем в textarea значения через event.target.value
		props.updateNewMessage(message)
	}

	const onAddMessage = () => {
		props.addMessage()
	}

	return (
		<div className={cl.dialogsWrapper}>
			<div className={cl.dialogs}>
				<ul className={cl.dialogsItems}>{dialogItems}</ul>
				<div className={cl.messages}>{DialogMessages}</div>
			</div>
			<textarea
				onChange={onMessageTextChange}
				placeholder=' enter message'
				value={props.newMessageText}
			></textarea>
			<button onClick={onAddMessage}>send</button>
		</div>
	)
}

export default Dialogs
