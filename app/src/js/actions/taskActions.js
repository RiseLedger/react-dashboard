import * as types from '../constants/actionTypes';
import Firebase from 'firebase';
import * as firebaseConfig from '../constants/Firebase';

Firebase.initializeApp(firebaseConfig);

export function receiveTask(task) {
  return {type: types.ADD_TASK, task};
}

export function removeTasks() {
  return {type: types.REMOVE_TASKS};
}

export function loadTasks(tasks) {
  return {type: types.LOAD_TASKS, tasks};
}

export function changeOrder(source, target) {
  return {type: types.CHANGE_ORDER, source, target};
}

export function changeStatus(task, status) {
  return {type: types.CHANGE_STATUS, task, status};
}

export function listenForNewTasks() {
  return dispatch => {
    let tasksList = [];
    Firebase.database().ref('tasks').once('value', function(snapshot) {
      snapshot.forEach(function (item) {
        tasksList.push(item.val());
      });
      dispatch(loadTasks(tasksList));
    });
  }
}

export function addTask(task) {
  return (dispatch, getState) => {
    let { tasks } = getState();

    tasks.push(task);

    Firebase.database().ref('tasks').set(tasks, function () {
        dispatch(loadTasks(tasks));
    });
  }
}

export function clearTasksList() {
  return dispatch => {
    Firebase.database().ref('tasks').remove(function () {
      dispatch(removeTasks());
    });
  }
}

export function swapTask(source, target) {
  return (dispatch, getState) => {
    dispatch(changeOrder(source, target));
  }
}

export function saveDraggedTasks() {
  return (dispatch, getState) => {
    let { tasks } = getState();

    Firebase.database().ref('tasks').set(tasks, function () {
      dispatch(loadTasks(tasks));
    });
  }
}
