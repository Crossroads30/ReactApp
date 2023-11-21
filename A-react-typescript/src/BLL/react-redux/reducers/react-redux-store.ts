import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import profileReducer from './profile-reducer.ts'
import messageReducer from './message-reducer.ts'
import usersReducer from './users-reducer.ts'
import sidebarReducer from './sidebar-reducer.ts'
import authReducer from './auth-reducer.ts'
import thunkMiddleware  from 'redux-thunk'
import { reducer as formReducer } from 'redux-form' 
import appReducer from './app-reducer.ts'
 import { compose } from 'redux'

const rootReducer = combineReducers({
	profilePage: profileReducer,
	messagesPage: messageReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReducer,
	form: formReducer,
})

type RootReducerType = typeof rootReducer //внутри происходит что то вроде этого: (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType> //возвращает типы из RootReducer

//--------------------
//условие для определения типов для ActionCreators:

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U: never

//передаем в generic ActionsTypes ограничения (extends {[key: string]: ( ...args: any[])=> any}) то передаваемый тип должен быть объектом который возвращает функцию!!!
//и экспортируем его
export type InferActionsTypes<T extends {[key: string]: ( ...args: any[])=> any}> = ReturnType<PropertiesTypes<T>>

// let state: AppStateType // теперь можно явно видеть что именно находится внутри этого глобального стэйта
// state. // по обращению к этому стэйту будет всегда подсказка что внутри  
 
//для подключения redux dev-tool:
// @ts-ignore // строка ниже будет игнорироваться ts компилятором
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))//передаем в функцию createStore -> функцию composeEnhancers для подключения Chrome расширения 'redux dev-tool' в которую передаем applyMiddleware(thunkMiddleware)

//без подключения redux dev-tool:
// const store = createStore(reducers, applyMiddleware(thunkMiddleware))

// @ts-ignore // строка ниже будет игнорироваться ts компилятором
window.__store__ = store // обращение к глобальному store

export default store
