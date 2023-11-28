import cl from './DialogMessage.module.css'
import React, { FC } from 'react'

type PropsType = {
	id: string 
	message: string
}

const DialogMessage: FC<PropsType> = (props) => {
	return (
		<div className={cl.message} id={props.id}>
			{props.message}
		</div>
	)
}

export default DialogMessage