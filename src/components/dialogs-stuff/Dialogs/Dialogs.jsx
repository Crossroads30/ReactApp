import cl from './Dialogs.module.css'
import DialogItem from '../DialogItem/DialogItem'
import DialogMessage from '../DialogMessage/DialogMessage'
import React from 'react'
import {
	addMessageActionCreator,
	updateNewMessageActionCreator,
} from '../../../redux/state'

const Dialogs = props => {

	const dialogItems = props.data.dialogs.map(dialog => (
		<div className={cl.avatar}>
			<div className={cl.image}></div>
			<DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
		</div>
	))

	const DialogMessages = props.data.messages.map(message => (
		<DialogMessage message={message.message} id={message.id} key={message.id} />
	))

	// const newDialogMessage = React.createRef()

	const onMessageTextChange = (event) => {
		const message = event.target.value // вместо React.createRef() добавляем в textarea значения через event.target.value
		// const message = newDialogMessage.current.value
		// props.updateNewMessage(newMessage)
		props.dispatch(updateNewMessageActionCreator(message))
	}

	const addMessage = () => {
		// props.addMessage()
		props.dispatch(addMessageActionCreator())
	}

	return (
		<div className={cl.dialogsWrapper}>
			<div className={cl.dialogs}>
				<ul className={cl.dialogsItems}>{dialogItems}</ul>
				<div className={cl.messages}>{DialogMessages}</div>
			</div>
			<textarea
				onChange={onMessageTextChange}
				// ref={newDialogMessage}
				placeholder=' enter message'
				value={props.data.newMessageText}
			></textarea>
			<button onClick={addMessage}>send</button>
		</div>
	)
}

export default Dialogs
