// import cl from './Dialogs.module.css'
// import DialogItem from '../DialogItem/DialogItem'
// import DialogMessage from '../DialogMessage/DialogMessage'
// import React from 'react'
// import {
// 	addMessageActionCreator,
// 	updateNewMessageActionCreator,
// } from '../../../redux/message-reducer'
// import Dialogs from './Dialogs'

// const dialogsContainer = props => {
// 	const dialogItems = props.data.dialogs.map(dialog => (
// 		<div className={cl.avatar} key={dialog.id}>
// 			<div className={cl.image}></div>
// 			<DialogItem name={dialog.name} id={dialog.id} />
// 		</div>
// 	))

// 	const DialogMessages = props.data.messages.map(message => (
// 		<DialogMessage message={message.message} id={message.id} key={message.id} />
// 	))

// 	// const newDialogMessage = React.createRef()

// 	const onMessageTextChange = event => {
// 		const message = event.target.value // вместо React.createRef() добавляем в textarea значения через event.target.value
// 		// const message = newDialogMessage.current.value
// 		props.updateNewMessage(newMessage)
// 		props.dispatch(updateNewMessageActionCreator(message))
// 	}

// 	const addMessage = () => {
// 		// props.addMessage()
// 		props.dispatch(addMessageActionCreator())
// 	}

// 	return <Dialogs />
// }

// export default dialogsContainer
