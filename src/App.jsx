import './styles/App.css'
import ProfileContainer from './UI/components/Profile-stuff/Profile/ProfileContainer'
import Sidebar from './UI/components/sidebar-stuff/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Settings from './UI/components/settings-stuff/Settings/Settings'
import News from './UI/components/news-stuff/News/News'
import Music from './UI/components/music-stuff/Music/Music'
import DialogsContainer from './UI/components/dialogs-stuff/Dialogs/DialogsContainer'
import UsersContainer from './UI/components/Users/UsersContainer'
import HeaderContainer from './UI/components/Header/HeaderContainer'
import LoginPageContainer from './UI/components/login-stuff/LoginPage/LoginPageContainer'

const App = () => {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<HeaderContainer />
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
						<Route path='/login' element={<LoginPageContainer />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
