import {
	addPostActionCreator,
	updateNewPostActionCreator,
} from '../../../redux/profile-reducer'
import Posts from './Posts'
import { connect } from 'react-redux'

// const PostsContainer = props => {
// 	return (
// 		<StoreContext.Consumer>
// 			{store => {
				
// 				const state = store.getState()
// 				const onAddPost = () => {
// 					store.dispatch(addPostActionCreator())
// 				}

// 				const onPostChange = newText => {
// 					const action = updateNewPostActionCreator(newText)
// 					store.dispatch(action)
// 				}

// 				return (
// 					<Posts
// 						updateNewPostText={onPostChange}
// 						addPost={onAddPost}
// 						posts={store.getState().profilePage.posts}
// 						newPostText={store.getState().profilePage.newPostText}
// 					/>
// 				)
// 			}}
// 		</StoreContext.Consumer>
// 	)
// }

const setStateToProps = state => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	}
}

const setDispatchTpProps = dispatch => {
	return {
		addPost: () => {
			dispatch(addPostActionCreator())
		},
		updateNewPostText: newText => {
			dispatch(updateNewPostActionCreator(newText))
		},
	}
}

const PostsContainer = connect(setStateToProps, setDispatchTpProps)(Posts) 

export default PostsContainer