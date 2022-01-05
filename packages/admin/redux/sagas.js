import { all } from 'redux-saga/effects';
import user from './user/sagas';
import menu from './menu/sagas';
import albums from './albums/sagas';

export default function* rootSaga() {
  yield all([user(), menu(), albums()]);
}
