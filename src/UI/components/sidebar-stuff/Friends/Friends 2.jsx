import cl from './Friends.module.css'
import Friend from '../Friend/Friend'

const Friends = (props) => {
	return (
		<div className={cl.friendsWrapper}>
			<h2 className={cl.title}>Friends</h2>
			<div className={cl.friends}>
				{props.friends.map(friend => (
					<Friend name={friend.name} key={friend.id} />
				))}
			</div>
		</div>
	)
}

export default Friends