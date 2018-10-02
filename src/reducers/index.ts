import { combineReducers } from "redux";
import products from "./products";
import permissions from "./permissions";
import validations from "./validations";

const rootReducer = combineReducers({
  products,
  permissions,
  validations
});

export default rootReducer;
