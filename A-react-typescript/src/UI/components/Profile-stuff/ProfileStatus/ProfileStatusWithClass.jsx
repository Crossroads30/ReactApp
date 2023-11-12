import cl from './ProfileStatus.module.css'
import React, { useState } from 'react'

// пример на классовом компоненте
class ProfileStatus extends React.Component {

	state = {
		editMode: false,
		status: this.props.status,
	}

	activateEditMode = () => {
		// с синтаксисом стрелочной функции "bind(this)" в вызове этого метода не нужен
		// debugger
		this.setState({
			editMode: true,
		})
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false,
		})
		this.props.updateStatus(this.state.status)
	}

	onStatusChange = event => {
		this.setState({ status: event.currentTarget.value })
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.status !== this.props.status) {
			this.setState({
				status: this.props.status,
			})
		}
	}

	render() {
		return (
			<div className={cl.status}>
				{!this.state.editMode && (
					<div className={cl.statusText}>
						<p onDoubleClick={this.activateEditMode}>
							{this.props.status || 'No status'}
						</p>
					</div>
				)}
				{this.state.editMode && (
					<div className={cl.input}>
						<input
							autoFocus={true}
							defaultValue={this.state.status}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									// this.deactivateEditMode// почему то не работает????
									this.setState({ editMode: false })
									this.props.updateStatus(this.state.status)
								}
							}}
							onBlur={this.deactivateEditMode}
							onChange={this.onStatusChange}
						/>
					</div>
				)}
			</div>
		)
	}
}

export default ProfileStatus
