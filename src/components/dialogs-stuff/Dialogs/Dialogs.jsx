import cl from './Dialogs.module.css'
import DialogItem from '../DialogItem/DialogItem'
import DialogMessage from '../DialogMessage/DialogMessage'
import React from 'react'

const Dialogs = props => {

	const state = props.messagesPage

	const dialogItems = state.dialogs.map(dialog => (
		<div className={cl.avatar} key={dialog.id}>
			<div className={cl.image}></div>
			<DialogItem name={dialog.name} id={dialog.id} />
		</div>
	))

	const DialogMessages = state.messages.map(message => (
		<DialogMessage message={message.message} id={message.id} key={message.id} />
	))

	const onMessageTextChange = (event) => {
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
				value={state.newMessageText}
			></textarea>
			<button onClick={onAddMessage}>send</button>
		</div>
	)
}

export default Dialogs
