import React from 'react'
import {
	addMessageActionCreator,
	updateNewMessageActionCreator,
} from '../../../redux/message-reducer'
import Dialogs from './Dialogs'

const DialogsContainer = props => {

	const state = props.store.getState().messagesPage

	const onMessageTextChange = message => {
		const action = updateNewMessageActionCreator(message)
		props.store.dispatch(action)
	}

	const onAddMessage = () => {
		props.store.dispatch(addMessageActionCreator())
	}

	return (
		<Dialogs
			addMessage={onAddMessage}
			updateNewMessage={onMessageTextChange}
			messagesPage={state}
		/>
	)
}

export default DialogsContainer
