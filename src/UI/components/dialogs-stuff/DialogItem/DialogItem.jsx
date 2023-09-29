import cl from './DialogItem.module.css'
import { NavLink } from 'react-router-dom'

const DialogItem = (props) => {
  const path = '/dialogs/' + props.id
  
  return (
		<li className={cl.item}>
			<NavLink to={path}>{props.name}</NavLink>
		</li>
	)
}

export default DialogItem