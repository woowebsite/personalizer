import { handleActions } from 'redux-actions';
import * as actions from './actions'

const initialState = {
  id: '',
  name: '',
  desciption: '',
  loading: false,
}

// As object key in handleActions:
const albumReducer = handleActions({
  [actions.createAlbum]: (state, action) => ({
    ...state, ...action.payload
  }),
}, initialState);
export default albumReducer