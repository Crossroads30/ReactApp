import './styles/App.css'
// import ProfileContainer from './UI/components/Profile-stuff/Profile/ProfileContainer'
import Sidebar from './UI/components/sidebar-stuff/Sidebar/Sidebar.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Settings from './UI/components/settings-stuff/Settings/Settings.jsx'
import News from './UI/components/news-stuff/News/News.jsx'
import Music from './UI/components/music-stuff/Music/Music.jsx'
// import DialogsContainer from './UI/components/dialogs-stuff/Dialogs/DialogsContainer'
import UsersContainer from './UI/components/Users/UsersContainer.tsx'
import HeaderContainer from './UI/components/Header/HeaderContainer.jsx'
import LoginPageContainer from './UI/components/login-stuff/LoginPage/LoginPageContainer.tsx'
import React from 'react'
import { connect } from 'react-redux'
import { initializeApp } from './BLL/react-redux/reducers/app-reducer.ts'
import Preloader from './UI/components/common/Preloader/Preloader.jsx'
// import { compose } from 'redux'
// import { withRouter } from './UI/components/Profile-stuff/Profile/HookWithRoute'

//так называемая ленивая загрузка, когда компонент подгружается по необходимости
import { lazy } from 'react'
const DialogsContainer = React.lazy(() => import('./UI/components/dialogs-stuff/Dialogs/DialogsContainer.tsx'))
const ProfileContainer = React.lazy(() => import('./UI/components/Profile-stuff/Profile/ProfileContainer.tsx'))

// с ленивой загрузкой c помощью HOC: 
import { withSuspense } from './HOC/withSuspense.tsx'
import { AppStateType } from './BLL/react-redux/reducers/react-redux-store.ts'
const DialogsContainerWithSuspense = withSuspense(DialogsContainer)
const ProfileContainerWithSuspense = withSuspense(ProfileContainer)

type MapPropsType = ReturnType<typeof setStateToProps>
type DispatchPropsType = {
	initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		//функция показа необработанных ошибок
		// alert("Some error occurred")
		console.log('Some error occurred')
	}

	componentDidMount() {
		this.props.initializeApp() // берем thunkCreator initializeApp
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors) //перехватываем все необработанные ошибки промисов
	}

	//обязательно убираем обработчик событий что был вызван раннее и передаем в него те же аргументы
	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
						<Route path='/users' element={<UsersContainer pageTitle={'Users Page'} />} />
						<Route path='/music' element={<Music />} />
						<Route path='/settings' element={<Settings />} />
						{/* <Route path='*' element={<ProfileContainer />} /> */}
						{/* <Route
							path='*'
							element={
								<React.Suspense fallback={<Preloader />}>
									<ProfileContainerWithSuspense />
								</React.Suspense>
							}
						/> */}
						<Route path='/login' element={<LoginPageContainer />} />

						<Route path='*' element={<h2>404 - Page not found</h2>} /> 
						{/* <Route exact path='/' element={<Navigate from='/' to={'/profile/'} />} /> */}
					</Routes>
				</div>
			</div>
		)
	}
}

const setStateToProps = (state: AppStateType) => {
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