import cl from './Friends.module.css'
import Friend from '../Friend/Friend'
import StoreContext from '../../../context/Store-context'

const Friends = () => {
	return (
		<StoreContext.Consumer>
			{store => (
				<div className={cl.friendsWrapper}>
					<h2 className={cl.title}>Friends</h2>
					<div className={cl.friends}>
						{store.getState().sidebar.friends.map(friend => (
							<Friend name={friend.name} key={friend.id} />
						))}
					</div>
				</div>
			)}
		</StoreContext.Consumer>
	)
}

export default Friends

// const Friends = props => {
// 	return (
// 		<div className={cl.friendsWrapper}>
// 			<h2 className={cl.title}>Friends</h2>
// 			<div className={cl.friends}>
// 				{props.data.friends.map(friend => (
// 					<Friend name={friend.name} key={friend.id} />
// 				))}
// 			</div>
// 		</div>
// 	)
// }
