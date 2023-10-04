import cl from './ProfileStatus.module.css'
import React, { useState } from 'react'

const ProfileStatus = props => {
	let [editMode, setEditMode] = useState(false)
	let [status, setStatus] = useState(props.status)

	return (
		<div className={cl.status}>
			{!editMode && (
				<div className={cl.statusText}>
					<p
						onDoubleClick={() => {
							setEditMode(true)
						}}
					>
						{props.status || 'No status'}
					</p>
				</div>
			)}
			{editMode && (
				<div className={cl.input}>
					<input
						size='30'
						autoFocus={true}
						defaultValue={status}
						onKeyDown={event => {
							if (event.key === 'Enter') {
								setEditMode(false)
								props.updateStatus(status)
							}
						}}
						onBlur={() => {
							setEditMode(false)
							props.updateStatus(status)
						}}
						onChange={event => {
							setStatus(event.currentTarget.value)
						}}
					/>
				</div>
			)}
		</div>
	)
}

export default ProfileStatus

// пример на классовом компоненте
// class ProfileStatus extends React.Component {

// 	state = {
// 		editMode: false,
// 		status: this.props.status,
// 	}

// 	activateEditMode = () => {
// 		// с синтаксисом стрелочной функции "bind(this)" в вызове этого метода не нужен
// 		// debugger
// 		this.setState({
// 			editMode: true,
// 		})
// 	}

// 	deactivateEditMode = () => {
// 		this.setState({
// 			editMode: false,
// 		})
// 		this.props.updateStatus(this.state.status)
// 	}

// 	onStatusChange = event => {
// 		this.setState({ status: event.currentTarget.value })
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevProps.status !== this.props.status) {
// 			this.setState({
// 				status: this.props.status,
// 			})
// 		}
// 	}

// 	render() {
// 		return (
// 			<div className={cl.status}>
// 				{!this.state.editMode && (
// 					<div className={cl.statusText}>
// 						<p onDoubleClick={this.activateEditMode}>
// 							{this.props.status || 'No status'}
// 						</p>
// 					</div>
// 				)}
// 				{this.state.editMode && (
// 					<div className={cl.input}>
// 						<input
// 							autoFocus={true}
// 							defaultValue={this.state.status}
// 							onKeyDown={event => {
// 								if (event.key === 'Enter') {
// 									// this.deactivateEditMode// почему то не работает????
// 									this.setState({ editMode: false })
// 									this.props.updateStatus(this.state.status)
// 								}
// 							}}
// 							onBlur={this.deactivateEditMode}
// 							onChange={this.onStatusChange}
// 						/>
// 					</div>
// 				)}
// 			</div>
// 		)
// 	}
// }

// export default ProfileStatus
