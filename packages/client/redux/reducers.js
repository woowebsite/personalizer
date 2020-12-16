import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'

export default combineReducers({
  // router: connectRouter(history),
  user,
  menu,
})
