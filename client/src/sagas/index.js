import { all } from "redux-saga/effects";
import { permissionsWatcherSaga } from "./permissionsSaga";
import { productsWatcherSaga } from "./productsSaga";

export default function* rootSaga() {
  yield all([permissionsWatcherSaga(), productsWatcherSaga()]);
}
