import './styles/App.css'
import ProfileContainer from './components/Profile-stuff/Profile/ProfileContainer'
import Header from './components/Header/Header'
import Sidebar from './components/sidebar-stuff/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Settings from './components/settings-stuff/Settings/Settings'
import News from './components/news-stuff/News/News'
import Music from './components/music-stuff/Music/Music'
import DialogsContainer from './components/dialogs-stuff/Dialogs/DialogsContainer'
import UsersContainer from './components/Users/UsersContainer'

const App = props => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Sidebar />
				<div className='app-content'>
					<Routes>
						<Route path='/profile/:userId?' element={<ProfileContainer />} />
						{/* чтобы отображался 'profile' вне зависимости от URL звездочку добавляем в конец */}
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/news' element={<News />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='*' element={<ProfileContainer />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
{/*store={props.store}*/}