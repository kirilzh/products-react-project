import {
  CHANGE_ACTION,
  ADD_PRODUCT_FORM_TOGGLE
} from "../constants/ActionTypes";

// CRUD
const ADD_PRODUCT = "ADD_PRODUCT";
const SAVE_PRODUCT = "SAVE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

// FETCHING FROM API
const PRODUCT_FETCH_REQUEST = "PRODUCT_FETCH_REQUEST";
const PRODUCT_FETCH_SUCCESS = "PRODUCT_FETCH_SUCCESS";
const PRODUCT_FETCH_FAILURE = "PRODUCT_FETCH_FAILURE";

const initialState = {
  fetching: false,
  data: null,
  error: null,
  products: [
    {
      "name": "TV",
      "price": 1000,
      "currency": "USD"
    },
    {
      "name": "SSD",
      "price": 100,
      "currency": "USDServer"
    }
  ],
  name: "",
  price: "",
  currency: "",
  addProductFormVisible: false
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };

    case PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.products
      };

    case PRODUCT_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          {
            name: action.name,
            price: action.price,
            currency: action.currency,
            editable: false
          }
        ]
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

    case DELETE_PRODUCT:
      const deleteProducts = [...state.products];
      deleteProducts.splice(action.index, 1);
      return {
        ...state,
        products: deleteProducts
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
