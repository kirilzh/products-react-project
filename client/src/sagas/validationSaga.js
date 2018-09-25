import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

export function* validationsWatcherSaga() {
  yield takeLatest("VALIDATIONS_FETCH_REQUEST", workerSaga);
}

function fetchValidations() {
  return axios({
    method: "get",
    url:"/validations"
  })
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchValidations);
    let validations = response.data;

    let result = {};
    for (let i = 0; i < validations.length; i++) {
      result[validations[i].name] = validations[i].expression;
    }

    validations = result;


    // dispatch a success action to the store with the new permissions
    yield put({ type: "VALIDATIONS_FETCH_SUCCESS", validations });
  } catch (error) {
    // dispatch failure action to the store with the error
    yield put({ type: "VALIDATIONS_FETCH_FAILURE", error });
  }
}
