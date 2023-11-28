import React from 'react'
import Friends from './Friends'
import { connect } from 'react-redux'
import { getFriendsTC } from '../../../../BLL/react-redux/reducers/sidebar-reducer'
import { AppStateType } from '../../../../BLL/react-redux/reducers/react-redux-store'
import { UserType } from '../../../../types/types'

type MapStatePropsType = {
	friends: Array<UserType>
	totalUsersCount: number
}

type DispatchPropsType = {
	getFriendsTC: (totalUsersCount: number) => void
}

class FriendsContainer extends React.Component<MapStatePropsType & DispatchPropsType> {
	componentDidMount() {
		this.props.getFriendsTC(this.props.totalUsersCount)
		//этот колбэк(getFriendsTC) передает эти параметры в thunkCreator
	}

	render() {
		return <Friends friends={this.props.friends} />
	}
}

const setStateToProps = (state: AppStateType) => {
	return {
		friends: state.sidebar.friends,
		totalUsersCount: state.sidebar.totalUsersCount,
	} as MapStatePropsType
}


export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(setStateToProps, {
	getFriendsTC,
})(FriendsContainer)
