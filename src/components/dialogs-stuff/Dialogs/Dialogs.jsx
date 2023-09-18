import cl from './Dialogs.module.css'
import DialogItem from '../DialogItem/DialogItem'
import DialogMessage from '../DialogMessage/DialogMessage'

const Dialogs = (props) => {
	return (
		<div className={cl.dialogs}>
			<ul className={cl.dialogsItems}>
				{props.data.dialogs.map(dialog => (
					<DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
				))}
			</ul>
			<div className={cl.messages}>
				{props.data.messages.map(message => (
					<DialogMessage
						message={message.message}
						id={message.id}
						key={message.id}
					/>
				))}
			</div>
		</div>
	)
}

export default Dialogs
