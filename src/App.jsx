import './styles/App.css'
import Profile from './components/Profile-stuff/Profile/Content'
import Header from './components/Header/Header'
import Sidebar from './components/sidebar-stuff/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Settings from './components/settings-stuff/Settings/Settings'
import News from './components/news-stuff/News/News'
import Music from './components/music-stuff/Music/Music'
import DialogsContainer from './components/dialogs-stuff/Dialogs/DilogsContainer'

const App = props => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Sidebar state={props.state.sidebar} />
				<div className='app-content'>
					<Routes>
						<Route path='/profile' element={<Profile store={props.store} />} />
						<Route
							path='/dialogs/*'
							element={<DialogsContainer store={props.store} />}
						/>
						<Route path='/news' element={<News />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/' element={<Profile store={props.store} />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
