import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts working saga
export function* productsWatcherSaga() {
  yield takeLatest("PRODUCTS_FETCH_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchProducts() {
  return axios({
    method: "get",
    url: "/products"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
  try {
    const response = yield call(fetchProducts);
    const products = response.data;

    // dispatch a success action to the store with the new products
    yield put({ type: "PRODUCTS_FETCH_SUCCESS", products });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "PRODUCTS_FETCH_FAILURE ", error });
  }
}
