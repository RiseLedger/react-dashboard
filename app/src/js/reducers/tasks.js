import {ADD_TASK, REMOVE_TASKS, LOAD_TASKS, CHANGE_ORDER, CHANGE_STATUS} from '../constants/actionTypes';
import initialState from './initialState';

export default function tasks(state = initialState.tasks, action) {

  switch(action.type) {
    case ADD_TASK:
      return [...state, Object.assign({}, action.task)];
    case REMOVE_TASKS:
      return [];
    case LOAD_TASKS:
      return [...action.tasks];
    case CHANGE_ORDER:
      [action.source.order, action.target.order] = [action.target.order, action.source.order];
      return [...state];
    case CHANGE_STATUS:
      action.task.status = action.status;
      return [...state];
    default:
      return state;
  }

}
