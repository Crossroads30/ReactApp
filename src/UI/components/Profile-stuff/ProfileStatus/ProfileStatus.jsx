import cl from './ProfileStatus.module.css'
import React, { useState } from 'react'

const ProfileStatus = (props) => {

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState('Everything you can imagine is real')
    
  return (
		<div className={cl.status}>
			{!editMode && (
				<div className={cl.statusText}>
					<p
						onDoubleClick={() => {
							setEditMode(true)
						}}
					>
						{status}
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
							}
						}}
						onBlur={() => {
							setEditMode(false)
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


//пример на классовом компоненте
// class ProfileStatus extends React.Component {

// 	state = {
//     editMode: false,
//     status: "Everything you can imagine is real"
//   }

//     activateEditMode() {
//       this.setState({
//         editMode: true
//       })  
//     }
    
//     deactivateEditMode() {
//       this.setState({
// 				editMode: false
// 			})  
//     }

// 	render () {
//     return (
// 			<div className={cl.status}>
// 				{!this.state.editMode && (
// 					<div className={cl.statusText}>
// 						<p onDoubleClick={this.activateEditMode.bind(this)}>
// 							{this.state.status}
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
// 									// this.deactivateEditMode.bind(this)// почему то не работает????
//                   this.setState({ editMode: false })
// 								}
// 							}}
// 							onBlur={this.deactivateEditMode.bind(this)}
// 							onChange={event => {
// 								this.setState({status: event.currentTarget.value}) 
// 							}}
// 						/>
// 					</div>
// 				)}
// 			</div>
// 		)

//   }
// }

// export default ProfileStatus