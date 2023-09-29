import axios from 'axios'

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '3f7ad031-df1b-42ff-b2a2-b96c84e80631',
	},
})

export const userApi = {
	getUsers(currentPage = 1, pageSize = 5) {
		return instance
			.get(
				`users?page=${currentPage}&count=${pageSize}`
				// `http://localhost:3000/items/?_limit=${this.props.pageSize}&_page=${this.props.currentPage}`
			)
			.then(response => response.data.items)
	},

	getAuth() {
		return instance.get(`auth/me`).then(response => response.data.data)
	},
}
