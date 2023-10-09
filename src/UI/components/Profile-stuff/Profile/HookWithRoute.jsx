// import { useLocation, useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


// export const withRouter = Component => {
// 	function ComponentWithRouterProp(props) {
// 		let location = useLocation()
// 		let navigate = useNavigate()
// 		let params = useParams()
// 		return <Component {...props} router={{ location, navigate, params }} />
// 	}
// 	return ComponentWithRouterProp
// }

// export const withRouterProfile = Component => {
// 	function ComponentWithRouterProp(props) {
// 		let location = useLocation()
// 		let navigate = useNavigate()
// 		let params = useParams()

// 		useEffect(() => {
// 			if (!props.isAuth) {
// 				navigate('/login')
// 			}
// 		}, [props.isAuth, navigate])

// 		return <Component {...props} router={{ location, navigate, params }} />
// 	}
// 	return ComponentWithRouterProp
// }

export const withRouter = (Children) => {
	return props => {
		const location = { location: useLocation() }
		const match = { params: useParams() }
		return (
			<Children
				{...props}
				match={match}
				location={location}
			/>
		)
	}
}