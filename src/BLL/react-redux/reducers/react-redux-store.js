import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import profileReducer from './profile-reducer'
import messageReducer from './message-reducer'
import usersReducer from './users-reducer'
import sidebarReducer from './sidebar-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware  from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer'

const reducers = combineReducers({
	profilePage: profileReducer,
	messagesPage: messageReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store
