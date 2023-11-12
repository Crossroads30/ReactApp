import { addPost } from '../../../../BLL/react-redux/reducers/profile-reducer'
import Posts from './Posts'
import { connect } from 'react-redux'

const setStateToProps = state => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	}
}


const PostsContainer = connect(setStateToProps, { addPost })(Posts)

export default PostsContainer
