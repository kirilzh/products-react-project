import { combineReducers } from "redux";
import products from "./productsReducer";
import permissions from "./permissionsReducer";

const rootReducer = combineReducers({
  products,
  permissions
});

export default rootReducer;
