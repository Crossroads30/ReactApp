import axios from 'axios'
import React from 'react'
import Users from './Users'

class UsersApiContainer extends React.Component {
	componentDidMount() {
		axios
			.get(
				`http://localhost:3000/items/?_limit=${this.props.pageSize}&_page=${this.props.currentPage}`
			)
			.then(response => {
				this.props.setUsers(response.data)
				// this.props.setTotalUsersCount(response.data.count.totalCount)
			})
	}

	onPageChange = pageNumber => {
		//!!!!обратить внимание что этот синтаксис этого метода - стрелочная функция!!!!
		this.props.setCurrentPage(pageNumber)
		axios
			.get(
				`http://localhost:3000/items?_limit=${this.props.pageSize}&_page=${pageNumber}`
			)
			.then(response => {
				this.props.setUsers(response.data)
			})
	}

	render() {
		return (
			<Users
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChange={this.onPageChange}
				users={this.props.users}
				unfollow={this.props.unfollow}
				follow={this.props.follow}
			/>
		)
	}
}

export default UsersApiContainer
