import { NavLink } from 'react-router-dom'
import cl from './Header.module.css'
import React, { FC } from 'react'

export type MapPropsType = {
	login: string | null
	isAuth: boolean
}

export type DispatchPropsType = {
	logoutFromServer: () => void
} 


const Header: FC<MapPropsType & DispatchPropsType> = ({ login, isAuth, logoutFromServer }) => {
	const getLogout = () => {
		logoutFromServer()
	}

	return (
		<div className={cl.header}>
			<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB0BwpcUPAu9WH5bOICKbpExWFUk4nExbc1g&usqp=CAU' alt='' />
			<h1>React-Redux Social Net</h1>
			<div className={cl.loginBlock}>
				{isAuth ? (
					<>
						<p className={cl.login}>{login}</p>
						<p onClick={getLogout} className={cl.logout}>
							logout
						</p>
					</>
				) : (
					<NavLink to={'/login'}>Login</NavLink>
				)}
			</div>
		</div>
	)
}

export default Header
