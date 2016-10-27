import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import {video} from './video';
import {snackBar} from './snackBar';
import {record} from './record'
import {dialog} from './dialog'
import {loader} from './loader';

const rootReducer = combineReducers({
  form:formReducer,
  snackBar,
  video,
  record,
  dialog,
  loader,
  routing
});

export default rootReducer;
