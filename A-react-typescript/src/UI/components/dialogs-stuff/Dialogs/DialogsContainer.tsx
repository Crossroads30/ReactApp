import { actions } from '../../../../BLL/react-redux/reducers/message-reducer'
import Dialogs from './Dialogs.tsx'
import React from 'react'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../../../HOC/withAuthRedirect.tsx'
import { compose } from 'redux'
import { AppStateType } from '../../../../BLL/react-redux/reducers/react-redux-store'
import { DialogsType, MessagesType } from '../../../../types/types'

type MapStatePropsType = {
	//пропсы которые приходят из MapStateToProps(данные)
	dialogs: Array<DialogsType>
	messages: Array<MessagesType>
}

type MapDispatchPropsType = {
	//пропсы которые приходят из MapDispatchToProps(колбэки)
	addMessage: (messageText: string | undefined) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType //присваиваем PropsType через & все три вида типов

class DialogsContainer extends React.Component<PropsType> {
	componentDidMount() {
		// debugger
	}

	render() {
		return <Dialogs {...this.props} />
	}
}

const setStateToProps = (state: AppStateType): MapStatePropsType | any => {
	return {
		dialogs: state.messagesPage.dialogs,
		messages: state.messagesPage.messages,
		// newMessageText: state.messagesPage.newMessageText,
	}
}

// экспортируем по умолчанию функцию “конвейер” в которую передаются другие функции в которые по цепочке вкладываются как бы друг в друга с определенным компонентом в основании:
export default compose<React.ComponentType>(
	connect(setStateToProps, {
		// то во что вкладывается другая функция(withAuthRedirect) с самим компонентом
		addMessage: actions.addMessage,
		// ...actions (2 вариант передачи AC из объекта actions)
	}),
	withAuthRedirect // то во что вкладывается сам компонент
)(DialogsContainer)//сам компонент
