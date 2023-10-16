import cl from './PagePaginator.module.css'


const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChange }) => {
	let pagesCount = Math.ceil(totalUsersCount / pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	return ( 
		<div className={cl.pagination}>
			{pages.map(page => (
				<span
					key={page}
					// className={currentPage === page && cl.selectedPage}// этот вариант работает, но с Warning
					className={currentPage === page ? cl.selectedPage : cl.pagination + ' ' + 'span'}
					onClick={() => {
						onPageChange(page)
					}}
				>
					{page}
				</span>
			))}
		</div>
	)
}

export default Paginator

					// className={currentPage === page ? cl.selectedPage : cl.pagination + ' ' + 'span'}