import { handleActions } from 'redux-actions';
import * as actions from './actions'

const initialState = {
  id: '',
  name: '',
  role: '',
  email: '',
  avatar: '',
  authorized: false,
  loading: false,
}

// As object key in handleActions:
const userReducer = handleActions({
  [actions.login]: (state, action) => ({
    ...state, ...action.payload
  }),
  [actions.setState]: (state, action) => ({

  })
}, initialState);
export default userReducer