import cl from './ProfileStatus.module.css'
import React, { useEffect, useState } from 'react'

export const ProfileStatusWithHooks = props => {
	// let stateWithSetState = useState(false) //это массив
	// let editMode = stateWithSetState[0] //первый элемент этого массива(значение false)
	// let setEditMode = stateWithSetState[1] //второй элемент этого массива - функция(которая будет изменять этот state со значением false)

	let [editMode, setEditMode] = useState(false) //с помощью диструктуризации присваиваем названия значению[0] и функции[1] и объявляем изначальное значения(false)
	let [status, setStatus] = useState(props.status) // аналогично

	useEffect(() => {
		setStatus(props.status) // то что надо перерисовать
	}, [props.status]) // вторым параметром идет массив зависимостей(в данном случае то что приходит из пропсов), т.е. если что то в нем изменилось то только тогда будет перерисовка(setStatus(props.status)), т.е. синхронизация произойдет тогда , когда измениться что-то в массиве зависимостей

	const activeEditMode = () => {
		//создаем функцию которая вызывает функцию из useState и передаем туда измененное значение(true)
		setEditMode(true)
	}
	const deactivateEditMode = () => {
		//создаем функцию которая вызывает функцию из useState и передаем туда измененное значение(false)
		setEditMode(false)
		props.updateStatus(status)
	}
	const onStatusChange = event => {
		//создаем функцию которая вызывает функцию из useState и передаем туда измененное значение для status
		setStatus(event.currentTarget.value)
	}

	return (
		<div className={cl.status}>
			{!editMode && ( //т.е. если значение = true
				<div className={cl.statusText}>
					<p onDoubleClick={activeEditMode}>{props.status || 'No status'}</p>
				</div>
			)}
			{editMode && ( //т.е. если значение = false
				<div className={cl.input}>
					<input
						autoFocus={true}
						value={status}
						onKeyDown={event => {
							if (event.key === 'Enter') {
								deactivateEditMode() //именно вызываем функцию, т.к. присваивания здесь нет!!!
							}
						}}
						onBlur={deactivateEditMode}
						onChange={onStatusChange}
					/>
				</div>
			)}
		</div>
	)
}

export default ProfileStatusWithHooks
