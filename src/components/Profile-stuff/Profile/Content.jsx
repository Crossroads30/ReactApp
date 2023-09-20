import Posts from '../Posts/Posts'
import User from '../User/User'
import cl from './Content.module.css'

const Profile = (props) => {
	return (
		<main className={cl.content}>
			<User />
			<Posts
				posts={props.data.posts}
				newPostText={props.data.newPostText}
				dispatch={props.dispatch}
				// addPost={props.addPost}
				// updateNewPostText={props.updateNewPostText}
			/>
			{/*addPost - это функция*/}
		</main>
	)
}

export default Profile
