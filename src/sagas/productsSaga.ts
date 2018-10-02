import { takeLatest, call, put } from "redux-saga/effects";
import { api } from "./api";
import { delay } from "redux-saga";

// watcher saga: watches for actions dispatched to the store, starts working saga
export function* watchGetproducts() {
  yield takeLatest("PRODUCTS_FETCH_REQUEST", getProducts);
}

// worker saga: makes the api call when watcher saga sees the action
function* getProducts() {
  try {
    const response = yield call(api.fetchProducts);
    const products = response.data;

    // dispatch a success action to the store with the new products
    yield put({ type: "PRODUCTS_FETCH_SUCCESS", products });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "PRODUCTS_FETCH_FAILURE ", error });
    yield delay(3000);
    yield put({ type: "PRODUCTS_FETCH_REQUEST" });
  }
}

// ADD PRODUCT
export function* watchAddProduct() {
  yield takeLatest("PRODUCT_POST_REQUEST", addProduct);
}

function* addProduct(action) {
  try {
    const result = yield call(api.postProduct, action.product);
    if (result.status === 200)
      yield put({ type: "PRODUCTS_FETCH_REQUEST" });
  } catch (error) {
    console.log('error', );
  }
}

// DELETE PRODUCT
export function* watchDeleteProduct() {
  yield takeLatest("PRODUCT_DELETE_REQUEST", deleteProduct);
}

function* deleteProduct(action) {
  try {
    const result = yield call(api.deleteProduct, action.id);
    if (result.status === 200)
      yield put({ type: "PRODUCTS_FETCH_REQUEST" });
  } catch (error) {
    console.log(error);
  }
}

// UPDATE PRODUCT
export function* watchUpdateProduct() {
  yield takeLatest("PRODUCT_UPDATE_REQUEST", updateProduct);
}

export function* updateProduct(action) {
  console.log(action);
  try {
    const result = yield call(api.updateProduct, action)
    if (result.status === 200)
      yield put({ type: "PRODUCTS_FETCH_REQUEST" });
  } catch (error) {
    console.log(error);
  }
}
