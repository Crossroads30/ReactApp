import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './BLL/react-redux/reducers/react-redux-store.ts' //store из react-redux
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'

let root = ReactDOM.createRoot(document.getElementById('root'))
// используем HashRouter вместо BrowserRouter, для того что бы на gh-pages браузер адекватно отображал страницы от корневой папки( названия репозитория ), для полноценных хостингов надо использовать BrowserRouter
//Provider являясь родителем для всех вложенных компонент передает 'store' в глобальный контекст и любая компонента может стать консьюмером(потребителем) этого контекста и достать store оттуда, благодаря этому не нужно прокидывать store через пропсы вниз по дереву 
	root.render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	)