// import { useLocation, useParams } from 'react-router-dom'
import React, { FC, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export interface WithRouterProps {
	location: ReturnType<typeof useLocation>
	match: Record<string, string>
}

export const withRouter = <Props extends WithRouterProps>(Children: React.ComponentType<Props>) => {
	return (props: Omit<Props, keyof WithRouterProps>) => {
		const location = { location: useLocation() }
		const match = { params: useParams() }
		return <Children {...(props as Props)} match={match} location={location} />
	}
}

//-------------------------
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