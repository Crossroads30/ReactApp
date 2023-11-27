import { actions } from '../../../../BLL/react-redux/reducers/profile-reducer.ts'
import { AppStateType } from '../../../../BLL/react-redux/reducers/react-redux-store.ts'
import { PostsType } from '../../../../types/types.ts'
import PostsMemorized, { PropsType } from './Posts.tsx'
import { connect } from 'react-redux'

const addPost = actions.addPost

type MapStateType = {
	posts: Array<PostsType>
}

type MapDispatchPropsType = {
	addPost: (newPostText: string | undefined) => void
}

const setStateToProps = (state: AppStateType): MapStateType => {
	return {
		posts: state.profilePage.posts,
		// newPostText: state.profilePage.newPostText,
	}
}


const PostsContainer = connect<MapStateType, {}, MapDispatchPropsType, AppStateType>(setStateToProps, { addPost })(PostsMemorized)

export default PostsContainer
