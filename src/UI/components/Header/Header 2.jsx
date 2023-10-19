import { NavLink } from 'react-router-dom'
import cl from './Header.module.css'

const Header = (props) => {
	// debugger
	return (
		<div className={cl.header}>
			<img
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0BwpcUPAu9WH5bOICKbpExWFUk4nExbc1g&usqp=CAU'
				alt=''
			/>
			<h1>Social Net</h1>
			<div className={cl.loginBlock}>
				{props.isAuth ? (
					<p className={cl.login}>{props.login}</p>
				) : (
					<NavLink to={'/login'}>Login</NavLink>
				)}
			</div>
		</div>
	)
}

export default Header
