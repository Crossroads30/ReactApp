import { combineReducers, legacy_createStore as createStore } from 'redux'
import profileReducer from '../profile-reducer'
import messageReducer from '../message-reducer'
import sidebarReducer from '../sidebar-reducer'

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messageReducer,
  sidebar: sidebarReducer,
})

const store = createStore(reducers)

export default store