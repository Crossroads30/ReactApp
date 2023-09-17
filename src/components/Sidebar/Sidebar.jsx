import cl from './Sidebar.module.css'

const Sidebar = () => {
	return (
		<aside className={cl.sidebar}>
			<nav className={cl.nav}>
				<li>
					<a>Profile</a>
				</li>
				<li>
					<a>Messages</a>
				</li>
				<li>
					<a>News</a>
				</li>
				<li>
					<a>Music</a>
				</li>
				<li>
					<a>Settings</a>
				</li>
			</nav>
		</aside>
	)
}

export default Sidebar
