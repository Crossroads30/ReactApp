import cl from './Friends.module.css'
import Friend from '../Friend/Friend'
import React, { FC } from 'react'
import { PhotosType, UserType } from '../../../../types/types'

export type PropsType = {
	friends: Array<UserType>
}

const Friends: FC<PropsType> = (props: PropsType) => {
	return (
		<div className={cl.friendsWrapper}>
			<h2 className={cl.title}>Friends</h2>
			<div className={cl.friends}>
				{props.friends.map(friend => (
					<Friend name={friend.name} key={friend.id} photo={friend.photos.small} />
				))}
			</div>
		</div>
	)
}

export default Friends