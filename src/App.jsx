import Content from './components/Content-stuff/content/Content'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import Dialogs from './components/dialogs-stuff/Dialogs/Dialogs'

const App = () => {
	return (
		<div className='app-wrapper'>
			<Header />
			<Sidebar />
			<div className='app-content'>
				{/* <BrowserRouter>
				<Routes>
					<Route> */}
				{/* <Content /> */}
				<Dialogs />
				{/* </Route>
				</Routes>
			</BrowserRouter> */}
			</div>
		</div>
	)
}

export default App
