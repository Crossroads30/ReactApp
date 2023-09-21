import React from 'react'
import {
	addMessageActionCreator,
	updateNewMessageActionCreator,
} from '../../../redux/message-reducer'
import Dialogs from './Dialogs'
import StoreContext from '../../../context/Store-context'

const DialogsContainer = props => {

// 	const state = props.store.getState().messagesPage

// 	const onMessageTextChange = message => {
// 		const action = updateNewMessageActionCreator(message)
// 		props.store.dispatch(action)
// 	}

// 	const onAddMessage = () => {
// 		props.store.dispatch(addMessageActionCreator())
// 	}

	return (
		<StoreContext.Consumer>
			{store => {
				const state = store.getState().messagesPage

				const onMessageTextChange = message => {
					const action = updateNewMessageActionCreator(message)
					store.dispatch(action)
				}

				const onAddMessage = () => {
					store.dispatch(addMessageActionCreator())
				}

				return <Dialogs
					addMessage={onAddMessage}
					updateNewMessage={onMessageTextChange}
					messagesPage={store}
				/>
			}}
		</StoreContext.Consumer>
	)
}

export default DialogsContainer

// <Dialogs
// 	addMessage={onAddMessage}
// 	updateNewMessage={onMessageTextChange}
// 	messagesPage={state}
// />
