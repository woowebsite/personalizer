import { createAction, createActions } from 'redux-actions';
import constants from './constants';

export const setState = createAction(constants.SET_STATE)
export const login = createAction(constants.LOGIN)
export const loadCurrentAccount = createAction(constants.LOAD_CURRENT_ACCOUNT)
export const logout = createAction(constants.LOGOUT)