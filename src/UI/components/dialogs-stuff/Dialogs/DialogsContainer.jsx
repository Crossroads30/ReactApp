import { addMessage } from '../../../../BLL/react-redux/reducers/message-reducer'
import Dialogs from './Dialogs'
import React from 'react'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect'
import { compose } from 'redux'

class DialogsContainer extends React.Component {
	componentDidMount() {
		// debugger
	}

	render() {
		return <Dialogs {...this.props} />
	}
}

const setStateToProps = state => {
	return {
		dialogs: state.messagesPage.dialogs,
		messages: state.messagesPage.messages,
		newMessageText: state.messagesPage.newMessageText,
	}
}

// экспортируем по умолчанию функцию “конвейер” в которую передаются другие функции в которые по цепочке вкладываются как бы друг в друга с определенным компонентом в основании:
export default compose(
	connect(setStateToProps, {
		// то во что вкладывается другая функция(withAuthRedirect) с самим компонентом
		addMessage,
	}),
	withAuthRedirect // то во что вкладывается сам компонент
)(DialogsContainer) //сам компонент
