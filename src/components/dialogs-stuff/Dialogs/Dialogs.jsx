import cl from './Dialogs.module.css'
import DialogItem from '../DialogItem/DialogItem'
import DialogMessage from '../DialogMessage/DialogMessage'
import React from 'react'

const Dialogs = (props) => {

	const dialogItems = props.data.dialogs.map(dialog => (
		<DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
	))
	const DialogMessages = props.data.messages.map(message => (
		<DialogMessage message={message.message} id={message.id} key={message.id} />
	))

	const newDialogMessage = React.createRef()


	const onMessageTextChange = () => {
		const newMessage = newDialogMessage.current.value
		props.updateNewMessage(newMessage)
	}

		const addMessage = () => {
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
				ref={newDialogMessage}
				placeholder=' enter message'
				value={props.data.newMessageText}
			></textarea>
			<button onClick={addMessage}>send</button>
		</div>
	)
}

export default Dialogs
