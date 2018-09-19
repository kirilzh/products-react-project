import { all } from "redux-saga/effects";
import { permissionsWatcherSaga } from "./permissionsSaga";
import { validationsWatcherSaga } from "./validationSaga";
import {
  watchGetproducts,
  watchAddProduct,
  watchDeleteProduct,
  watchUpdateProduct
} from "./productsSaga";

export default function* rootSaga() {
  yield all([
    validationsWatcherSaga(),
    permissionsWatcherSaga(),
    watchGetproducts(),
    watchAddProduct(),
    watchDeleteProduct(),
    watchUpdateProduct()
  ]);
}
