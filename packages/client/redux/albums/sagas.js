import { all, takeEvery, put, call, select } from 'redux-saga/effects'
import { notification } from 'antd'
import constants from './constants'
import * as actions from './actions'

export function* createAlbumSaga({ payload }) {
  const { name, description } = payload
  const user = yield select(state => state.users.currentId)
 
}


export default function* rootSaga() {
  yield all([
    takeEvery(constants.CREATE_ALBUM, createAlbumSaga),
  ])
}
