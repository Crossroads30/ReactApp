import { useLocation, useParams } from 'react-router-dom'

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