import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//виды типизаций:

//примитивы:
let a: number | null = 100
let name: string = 'typescript'
let isTypescript: boolean | null = true
isTypescript = null

let sex: 'male' | 'female' //фиксированная типизация типов строки
sex = 'female'

//объекты:
//типизация объектов:

type AddressType = {
	city?: string | null
	country?: string | null
}

// изначальная типизация объекта:
let initialState = {
	name: null as string | null,
	age: null as number | null,
	isUser: null as boolean | null,
	addresses: [] as Array<AddressType>,
	counter: 0 as number,
}

export type InitialState = typeof initialState // typeof в тайпскрипте возвращает тип(type)

//берем типизацию из InitialState
let state: InitialState = {
	name: null,
	age: null,
	isUser: true,
	addresses: [{ city: null, country: null }],
	counter: 0
}

type UserType = {
	sayHello: Function
	sayGoodBye: (message: string) => void
	name: string
	age: number
	isUser: boolean
	address: AddressType | null
}

let user: UserType = {
	sayHello(message: string) {
		console.log(message)
	},
	sayGoodBye(message = 'goog-bye') {
		console.log(message)
	},
	name: 'Alex',
	age: 28,
	isUser: true,
	address: {
		city: 'Minsk',
	},
}

let names: Array<string> = ['Dima', 'Sveta', 'Pavel'] //первый вариант для массива
let names2: string[] = ['Dima', 'Sveta', 'Pavel'] //второй вариант для массива

const sum = (a: number, b: number) => {
	return a + b
}
sum(10, Number('20'))

//типизация actionType в reducers:
//например:
let GET_TASKS = 'app/GET_TASKS'

type GetTasksActionType = {
	type: typeof GET_TASKS // чтобы использовать константу в качестве типа перед ней пишем 'typeof'
	// typeof в тайпскрипте возвращает тип(type)
	id: number
}

let action: GetTasksActionType = {
	type: GET_TASKS,
	id: 12,
}



function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div>
				<a href='https://vitejs.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount(count => count + 1)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
		</>
	)
}

export default App
