import cl from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import Friends from '../Friends/Friends'

const Sidebar = (props) => {
	return (
		<aside className={cl.sidebar}>
			<nav className={cl.nav}>
				<ul className={cl.list}>
					<li>
						<NavLink
							className={navData => (navData.isActive ? cl.active : cl.link)}
							to='/profile'
						>
							Profile
						</NavLink>
					</li>
					<li>
						<NavLink
							className={navData => (navData.isActive ? cl.active : cl.link)}
							to='/dialogs'
						>
							Messages
						</NavLink>
					</li>
					<li>
						<NavLink
							className={navData => (navData.isActive ? cl.active : cl.link)}
							to='/news'
						>
							News
						</NavLink>
					</li>
					<li>
						<NavLink
							className={navData => (navData.isActive ? cl.active : cl.link)}
							to='/music'
						>
							Music
						</NavLink>
					</li>
					<li>
						<NavLink
							className={navData => (navData.isActive ? cl.active : cl.link)}
							to='/settings'
						>
							Settings
						</NavLink>
					</li>
				</ul>
			</nav>
			<Friends data={props.state}/>
		</aside>
	)
}

export default Sidebar
