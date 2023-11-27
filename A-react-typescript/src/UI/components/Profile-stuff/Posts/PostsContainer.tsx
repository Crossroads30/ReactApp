import { actions } from '../../../../BLL/react-redux/reducers/profile-reducer.ts'
import { AppStateType } from '../../../../BLL/react-redux/reducers/react-redux-store.ts'
import { PostsType } from '../../../../types/types.ts'
import PostsMemorized, { DispatchPropsType, MapPropsType } from './Posts.tsx'
import { connect } from 'react-redux'

type MapStateType = {
	posts: Array<PostsType>
}

type MapDispatchPropsType = {
	addPost: (newPostText: string | undefined) => void
}

const setStateToProps = (state: AppStateType) => {
	return {
		posts: state.profilePage.posts,
		// newPostText: state.profilePage.newPostText,
	} 
}


const PostsContainer = connect<MapPropsType, {}, DispatchPropsType, AppStateType>(setStateToProps, { addPost: actions.addPost })(PostsMemorized)

export default PostsContainer
