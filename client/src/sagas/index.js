import { all } from "redux-saga/effects";
import { permissionsWatcherSaga } from "./permissionsSaga";
import {
  watchGetproducts,
  watchAddProduct,
  watchDeleteProduct,
  watchUpdateProduct
} from "./productsSaga";

export default function* rootSaga() {
  yield all([
    permissionsWatcherSaga(),
    watchGetproducts(),
    watchAddProduct(),
    watchDeleteProduct(),
    watchUpdateProduct()
  ]);
}
