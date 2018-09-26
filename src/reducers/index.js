import { combineReducers } from "redux";
import products from "./productsReducer";
import permissions from "./permissionsReducer";
import validations from "./validationsReducer";

const rootReducer = combineReducers({
  products,
  permissions,
  validations
});

export default rootReducer;
