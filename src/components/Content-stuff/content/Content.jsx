import Post from '../Post/Post'
import Posts from '../Posts/Posts'
import User from '../User/User'
import cl from './Content.module.css'

const Content = () => {
	return (
		<main className={cl.content}>
			<img
				className={cl.contentImg}
				src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNFbPnraZxme2bIxu6D099w5lJ3p86n6fqww&usqp=CAU'
				alt='some image'
			/>
			<User />
			<Posts />
		</main>
	)
}

export default Content
