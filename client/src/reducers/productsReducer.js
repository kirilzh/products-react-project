import {
  CHANGE_ACTION,
  ADD_PRODUCT_FORM_TOGGLE
} from "../constants/ActionTypes";

// CRUD
const SAVE_PRODUCT = "SAVE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// FETCHING FROM API
const PRODUCTS_FETCH_REQUEST = "PRODUCTS_FETCH_REQUEST";
const PRODUCTS_FETCH_SUCCESS = "PRODUCTS_FETCH_SUCCESS";
const PRODUCTS_FETCH_FAILURE = "PRODUCTS_FETCH_FAILURE";

const initialState = {
  fetching: false,
  data: null,
  error: null,
  name: "",
  price: "",
  currency: "",
  addProductFormVisible: false
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.products
      };

    case PRODUCTS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      };

    case UPDATE_PRODUCT:
      const updateProductButton = [...state.products];
      updateProductButton[action.index].editable = !updateProductButton[
        action.index
      ].editable;

      return {
        ...state,
        products: updateProductButton
      };

    case SAVE_PRODUCT:
      const updateProducts = [...state.products];
      updateProducts[action.index].name = action.name;
      updateProducts[action.index].price = action.price;
      updateProducts[action.index].currency = action.currency;
      updateProducts[action.index].editable = !updateProducts[action.index]
        .editable;
      return {
        ...state,
        products: updateProducts
      };

    case CHANGE_ACTION:
      if (action.index === undefined) {
        state[action.field] = action.value;
        return {
          ...state
        };
      } else {
        state.products[action.index][action.field] = action.value;
        return {
          ...state
        };
      }

    case ADD_PRODUCT_FORM_TOGGLE: {
      state.addProductFormVisible = true;
      return {
        ...state
      };
    }

    default:
      return state;
  }
}
