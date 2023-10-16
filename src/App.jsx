import './styles/App.css'
// import ProfileContainer from './UI/components/Profile-stuff/Profile/ProfileContainer'
import Sidebar from './UI/components/sidebar-stuff/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Settings from './UI/components/settings-stuff/Settings/Settings'
import News from './UI/components/news-stuff/News/News'
import Music from './UI/components/music-stuff/Music/Music'
// import DialogsContainer from './UI/components/dialogs-stuff/Dialogs/DialogsContainer'
import UsersContainer from './UI/components/Users/UsersContainer'
import HeaderContainer from './UI/components/Header/HeaderContainer'
import LoginPageContainer from './UI/components/login-stuff/LoginPage/LoginPageContainer'
import React from 'react'
import { connect } from 'react-redux'
import { initializeApp } from './BLL/react-redux/reducers/app-reducer'
import Preloader from './UI/components/common/Preloader/Preloader'
// import { compose } from 'redux'
// import { withRouter } from './UI/components/Profile-stuff/Profile/HookWithRoute'

//так называемая ленивая загрузка, когда компонент подгружается по необходимости
import { lazy } from 'react'
const DialogsContainer = lazy(() => import('./UI/components/dialogs-stuff/Dialogs/DialogsContainer'))
const ProfileContainer = lazy(() => import('./UI/components/Profile-stuff/Profile/ProfileContainer'))

// с ленивой загрузкой c помощью HOC: 
import { withSuspense } from './HOC/withSuspense'
const DialogsContainerWithSuspense = withSuspense(DialogsContainer)
const ProfileContainerWithSuspense = withSuspense(ProfileContainer)

class App extends React.Component {

	componentDidMount() {
		this.props.initializeApp() // берем thunkCreator initializeApp
	}

	render() {
		// debugger
		if (!this.props.initialized) {
			return <Preloader />
		}
		return (
			<div className='app-wrapper'>
				<HeaderContainer />
				<Sidebar />
				<div className='app-content'>
					{/* Чтобы выполнялась так называемая ленивая загрузка страницы, нужно нужно в это время показывать загрузчик (любой div или компоненту). Чтобы отобразить загрузчик, нужно передать его в fallback в параметр компоненты React.Suspense, которой нужно обернуть импортированную компоненту. */}
					<Routes>
						{/* без ленивой загрузки: */}
						{/* <Route path='/profile/:userId?' element={<ProfileContainer />} /> */}
						{/* чтобы отображался 'profile' вне зависимости от URL звездочку добавляем в конец */}
						{/* с ленивой загрузкой без HOC: */}
						{/* <Route
							path='/profile/:userId?'
							element={
								<React.Suspense fallback={<Preloader />}>
									<ProfileContainer />
								</React.Suspense>
							}
						/> */}
						{/* с ленивой загрузкой c помощью HOC: */}
						<Route path='/profile/:userId?' element={<ProfileContainerWithSuspense />} />
						
						{/* без ленивой загрузки: */}
						{/* <Route path='/dialogs/*' element={<DialogsContainer />} /> */}
						{/* с ленивой загрузкой без HOC: */}
						{/* <Route
							path='/dialogs/*'
							element={
								<React.Suspense fallback={<Preloader />}>
									<DialogsContainer />
								</React.Suspense>
							}
						/> */}
						{/* с ленивой загрузкой c помощью HOC: */}
						<Route path='/dialogs/*' element={<DialogsContainerWithSuspense />} />
						<Route path='/news' element={<News />} />
						<Route path='/users' element={<UsersContainer />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						{/* <Route path='*' element={<ProfileContainer />} /> */}
						<Route
							path='*'
							element={
								<React.Suspense fallback={<Preloader />}>
									<ProfileContainer />
								</React.Suspense>
							}
						/>
						<Route path='/login' element={<LoginPageContainer />} />
					</Routes>
				</div>
			</div>
		)
	}
}

const setStateToProps = state => {
	return {
		initialized: state.app.initialized,
	}
}

export default connect(setStateToProps, { initializeApp })(App)

// здесь нет необходимости оборачивать все withRouter
// export default compose(
// 	// withRouter,
// 	connect(setStateToProps, {
// 		// то во что вкладывается сам компонент
// 		initializeApp, // вызываем thunkCreator initializeApp
// 	})
// )(App)