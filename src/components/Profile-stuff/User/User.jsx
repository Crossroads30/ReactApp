import cl from './User.module.css'

const User = () => {
	return (
		<>
			<img
				className={cl.contentImg}
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFbPnraZxme2bIxu6D099w5lJ3p86n6fqww&usqp=CAU'
				alt='some image'
			/>
			<div className={cl.user}>
				<img
					className={cl.userImg}
					src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6-MfoJ0MLH3ZH7oIyNvP_PfLRoYI-ZgPeQ&usqp=CAU'
					alt=''
				/>
				<div className={cl.userInfo}>
					<p className={cl.name}>James Z</p>
					<p className={cl.birth}>11-16-1980</p>
					<p className={cl.city}>City: Minsk</p>
					<p className={cl.education}>Education: BCIM</p>
					<p className={cl.email}>Email: Crossroads30@mail.ru</p>
				</div>
			</div>
		</>
	)
}

export default User
