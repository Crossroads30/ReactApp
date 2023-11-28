import Post from '../Post/Post.tsx'
import cl from './Posts.module.css'
import React, { FC } from 'react'
import { AddPostFormValuesType, PostsReduxForm } from './PostsForm.tsx'
import { PostsType } from '../../../../types/types'

export type MapPropsType = {
	posts: Array<PostsType>
}

export type DispatchPropsType = {
	addPost: (newPostText: string | undefined) => void
}


// React.memo — это компонент высшего порядка.React.memo затрагивает только изменения пропсов. Если функциональный компонент обёрнут в React.memo и использует useState, useReducer или useContext, он будет повторно рендериться при изменении состояния или контекста.Этот метод предназначен только для оптимизации производительности. Не полагайтесь на него, чтобы «предотвратить» рендер, так как это может привести к ошибкам.

const Posts: FC<MapPropsType & DispatchPropsType> = props => {
	const postsElements = props.posts.map(post => <Post text={post.message} likes={post.likes} key={post.id} />)

	const addNewPost = (formData: AddPostFormValuesType) => {
		props.addPost(formData.newPostText) 
	}

	return (
		<div className={cl.posts}>
			<PostsReduxForm onSubmit={addNewPost} />
			{postsElements}
		</div>
	)
}

const PostsMemorized = React.memo(Posts)

export default PostsMemorized

//--------------------------

// class Posts extends React.PureComponent {
// 	//если использовать данный синтаксис(PureComponent вместо Component) то shouldComponentUpdate происходит автоматически

// 	// class Posts extends React.Component {

// 	// componentDidMount() {
// 	// 	setTimeout(() => {         // просто для теста что компонента перерисовывается повторно при изменении стэйта
// 	// 		this.setState({ a: 10 })
// 	// 	}, 2000)
// 	// }

// 	// shouldComponentUpdate(nextProps, nextState) {
// 	// 	// во избежании ненужных повторных перерисовок, этот метод проверяет(по условию ниже) изменилось ли что либо в пропсах или в стэйте, если нет, то возвращается false и  перерисовки не происходит, если изменилось, возвращается true и происходит перерисовка
// 	// 	return nextProps !== this.props || nextState !== this.state
// 	// }

// 	render() {
// 		console.log('render')
// 		const postsElements = this.props.posts.map(post => (
// 			<Post text={post.message} likes={post.likes} key={post.id} />
// 		))

// 		const addNewPost = formData => {
// 			const newPostBody = formData.newPostText
// 			props.addPost(newPostBody)
// 		}

// 		return (
// 			<div className={cl.posts}>
// 				<PostsReduxForm onSubmit={addNewPost} />
// 				{postsElements}
// 			</div>
// 		)
// 	}
// }

// export default Posts