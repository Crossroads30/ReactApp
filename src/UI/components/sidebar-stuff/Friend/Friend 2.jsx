import cl from './Friend.module.css'

const Friend = props => {
	return (
		<div className={cl.friend}>
			<div className={cl.avatar}></div>
			<p className={cl.name}>{props.name}</p>
		</div>
	)
}

export default Friend
