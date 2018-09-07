import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import permissionsReducer from "./permissionsReducer";

const rootReducer = combineReducers({
  productsReducer,
  permissionsReducer
});

export default rootReducer;
