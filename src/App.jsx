import './styles/App.css'
import Profile from './components/Profile-stuff/Profile/Content'
import Header from './components/Header/Header'
import Sidebar from './components/sidebar-stuff/Sidebar/Sidebar'
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
				<Sidebar data={props.appData.sidebar} />
				<div className='app-content'>
					<Routes>
						<Route
							path='/profile'
							element={
								<Profile
									data={props.appData.profilePage}
									addPost={props.addPost}
									updateNewPostText={props.updateNewPostText}
								/>
							}
						/>
						<Route
							path='/dialogs/*'
							element={
								<Dialogs
									data={props.appData.messagesPage}
									updateNewMessage={props.updateNewMessage}
									addMessage={props.addMessage}
								/>
							}
						/>
						<Route path='/news' element={<News />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						<Route
							path='/'
							element={
								<Profile
									data={props.appData.profilePage}
									addPost={props.addPost}
									updateNewPostText={props.updateNewPostText}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
