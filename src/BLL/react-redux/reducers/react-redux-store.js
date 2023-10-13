import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import profileReducer from './profile-reducer'
import messageReducer from './message-reducer'
import usersReducer from './users-reducer'
import sidebarReducer from './sidebar-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware  from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'
 import { compose } from 'redux';

const reducers = combineReducers({
	profilePage: profileReducer,
	messagesPage: messageReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer,
})

 
//для подключения redux dev-tool:
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))//передаем в функцию createStore -> функцию composeEnhancers для подключения Chrome расширения 'redux dev-tool' в которую передаем applyMiddleware(thunkMiddleware)

//без подключения redux dev-tool:
// const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.__store__ = store // обращение к глобальному store

export default store
