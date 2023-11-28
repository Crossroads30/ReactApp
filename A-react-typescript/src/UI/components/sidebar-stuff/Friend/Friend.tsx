import cl from './Friend.module.css'
import defaultUserPhoto from '../../../../assets/images/userDefaultImage.png'
import React, { FC } from 'react'

type PropsType = {
	photo: string | null
	name: string
}

const Friend: FC<PropsType> = props => {
	// debugger
	return (
		<div className={cl.friend}>
			<img src={props.photo !== null ? props.photo : defaultUserPhoto} alt='avatarImg' className={cl.avatarImg} />
			<p className={cl.name}>{props.name}</p>
		</div>
	)
}

export default Friend
