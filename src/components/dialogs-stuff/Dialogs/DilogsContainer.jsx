import {
	addMessageActionCreator,
	updateNewMessageActionCreator,
} from '../../../redux/message-reducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'

// const DialogsContainer = props => {

// // 	const state = props.store.getState().messagesPage

// // 	const onMessageTextChange = message => {
// // 		const action = updateNewMessageActionCreator(message)
// // 		props.store.dispatch(action)
// // 	}

// // 	const onAddMessage = () => {
// // 		props.store.dispatch(addMessageActionCreator())
// // 	}

// 	return (
// 		<StoreContext.Consumer>
// 			{store => {
// 				const state = store.getState().messagesPage

// 				const onMessageTextChange = message => {
// 					const action = updateNewMessageActionCreator(message)
// 					store.dispatch(action)
// 				}

// 				const onAddMessage = () => {
// 					store.dispatch(addMessageActionCreator())
// 				}

// 				return <Dialogs
// 					addMessage={onAddMessage}
// 					updateNewMessage={onMessageTextChange}
// 					messagesPage={store}
// 				/>
// 			}}
// 		</StoreContext.Consumer>
// 	)
// }

const setStateToProps = (state) => {
	return {
		dialogs: state.messagesPage.dialogs,
		messages: state.messagesPage.messages,
		newMessageText: state.messagesPage.newMessageText
	}
}

const setDispatchTpProps = dispatch => {
	return {
		addMessage: () => {
			dispatch(addMessageActionCreator())
		},
		updateNewMessage: message => {
			dispatch(updateNewMessageActionCreator(message))
		},
	}
}

const DialogsContainer = connect(setStateToProps,setDispatchTpProps)(Dialogs)

export default DialogsContainer