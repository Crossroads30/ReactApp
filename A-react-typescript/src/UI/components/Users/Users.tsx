import cl from './Users.module.css'
import Preloader from '../common/Preloader/Preloader.tsx'
import { NavLink } from 'react-router-dom'
import Paginator from '../common/Paginator/PagePaginator.tsx'
import SeparateUser from './SeparateUser.tsx'
import React, { FC } from 'react'
import { UserType } from '../../../types/types.ts'
import { Field, Form, Formik } from 'formik'

type PropsType = {
	totalUsersCount: number
	pageSize: number
	onPageChange: (pageNumber: number) => void
	currentPage: number
	users: Array<UserType>
	isLoading: boolean
	followingInProgress: Array<number>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	setFriend: () => void
}

const Users: FC<PropsType> = ({ totalUsersCount, pageSize, onPageChange, currentPage, ...props }) => {
	return (
		<>
			<div className={cl.usersWrapper}>
				<UserSearchForm/>
				<Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChange={onPageChange} currentPage={currentPage} />
				{props.isLoading ? (
					<Preloader />
				) : (
					props.users.map(user => (
						<SeparateUser
							key={user.id}
							user={user}
							followingInProgress={props.followingInProgress}
							follow={props.follow}
							unfollow={props.unfollow}
							setFriend={props.setFriend}
						/>
					))
				)}
			</div>
		</>
	)
}

type usersSearchFormObjectType = {
	term: string
}

const usersSearchFormValidates = (values: any) => {
	const errors = {}
	return errors
}


const UserSearchForm: FC = () => {

	const submit = (values: usersSearchFormObjectType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		// setTimeout(() => {
		// 	// alert(JSON.stringify(values, null, 2))
		// 	setSubmitting(false)
		// }, 400)
		
	}


	return (
		<div>
			<Formik initialValues={{ term: '' }} validate={usersSearchFormValidates} onSubmit={submit}>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<Form onSubmit={handleSubmit}>
						<Field type='text' name='term' />
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Users
