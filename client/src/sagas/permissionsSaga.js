import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* permissionsWatcherSaga() {
  yield takeLatest("PERMISSIONS_FETCH_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchPermissions() {
  return axios({
    method: "get",
    url: "/permissions"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchPermissions);
    const permissions = response.data;

    // dispatch a success action to the store with the new permissions
    yield put({ type: "PERMISSIONS_FETCH_SUCCESS", permissions });
  } catch (error) {
    // dispatch failure action to the store with the error
    yield put({ type: "PERMISSIONS_FETCH_FAILURE", error });
  }
}
