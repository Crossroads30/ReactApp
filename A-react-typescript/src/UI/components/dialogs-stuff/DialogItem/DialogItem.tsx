import cl from './DialogItem.module.css'
import { NavLink } from 'react-router-dom'
import React from 'react'

type PropsType = {
	id: number
	name: string
}

const DialogItem: React.FC<PropsType> = props => {
	const path = '/dialogs/' + props.id

	return (
		<li className={cl.item}>
			<NavLink to={path}>{props.name}</NavLink>
		</li>
	)
}

export default DialogItem