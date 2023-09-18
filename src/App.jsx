import './styles/App.css'
import Content from './components/Profile-stuff/Profile/Content'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dialogs from './components/dialogs-stuff/Dialogs/Dialogs'
import Settings from './components/settings-stuff/Settings/Settings'
import News from './components/news-stuff/News/News'
import Music from './components/music-stuff/Music/Music'

const App = props => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Sidebar />
				<div className='app-content'>
					<Routes>
						<Route
							path='/profile'
							element={<Content data={props.appData.profilePage} />}
						/>
						<Route
							path='/dialogs/*'
							element={
								<Dialogs
									data={props.appData.messagesPage}
								/>
							}
						/>
						<Route path='/news' element={<News />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						<Route
							path='/'
							element={<Content data={props.appData.profilePage} />}
						/>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
