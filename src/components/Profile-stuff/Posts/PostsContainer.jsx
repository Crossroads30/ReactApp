import {
	addPostActionCreator,
	updateNewPostActionCreator,
} from '../../../redux/profile-reducer'
import Posts from './Posts'
import { connect } from 'react-redux'


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