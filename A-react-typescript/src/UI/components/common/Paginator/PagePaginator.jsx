import { useState } from 'react'
import cl from './PagePaginator.module.css'
import classnames from 'classnames'

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 10 }) => {
	let pagesCount = Math.ceil(totalItemsCount / pageSize)
	let pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}
	//portionSize = 10 - это количество элементов отображаемых в пагинаторе в одной порции
	//формула для порционного вывода страниц(поиска нужного номера страницы с которой отрисовать следующую или предыдущую порцию страниц ):
	//(p(текущий номер страницы) - 1) * portionSize(количество элементов в порции) + 1(т.к. нумерация идет с нуля )т.е. нам надо получить номера крайних страниц в одной порции - с левой стороны и с правой стороны(например вывод страниц в одной порции с 20 по 30 страницу: (20,21,22,23,24,25,26,27,28,29,30)- крайнее значение слева это №20, а справа это №30, вот их и надо получить
	let portionCount = Math.ceil(pagesCount / portionSize)
	let [portionNumber, setPortionNumber] = useState(1) //локальный стэйт для переключения страниц по умолчанию отображается 1я порция страниц
	let leftNumberOfPagePortion = (portionNumber - 1) * portionSize + 1 //формула для получения значения слева
	let rightNumberOfPagePortion = portionNumber * portionSize //формула для для получения значения справа

	return (
		<div className={cl.pagination}>
			{portionNumber > 1 && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber - 1)
					}}
				>
					{'<<'}
				</button>
			)}
			{pages
				.filter(page => page >= leftNumberOfPagePortion && page <= rightNumberOfPagePortion) //отображаем только те страницы которые больше либо равны крайнему левому номеру порции и меньше либо равны крайнему правому номеру данной порции страниц
				.map(page => {
					return (
						<span
							key={page}
							// className={currentPage === page && cl.selectedPage}// этот вариант работает, но с Warning
							// className={currentPage === page ? cl.pagination + ' ' + 'span' + ' ' + cl.selectedPage : cl.pagination + ' ' + 'span'}
							className={
								currentPage === page
									? classnames([cl.pagination], 'span', [cl.selectedPage])
									: classnames([cl.pagination], 'span')
							} //используем библиотеку classnames вместо кода выше для склеивания разных классов
							onClick={() => {
								onPageChange(page)
							}}
						>
							{page}
						</span>
					)
				})}
			{portionCount > portionNumber && (
				<button
					onClick={() => {
						setPortionNumber(portionNumber + 1)
					}}
				>
					{'>>'}
				</button>
			)}
		</div>
	)
}

export default Paginator
