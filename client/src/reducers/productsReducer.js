export const CHANGE_ACTION = "CHANGE_ACTION";

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
  temporary: {
    name: {
      value: "",
      valid: false
    },
    price: {
      value: "",
      valid: false
    },
    currency: {
      value: "",
      valid: false
    }
  }
};

export default function productsReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case PRODUCTS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
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

    case CHANGE_ACTION:
      state.temporary.name[action.field] = action.value;

      return {
        ...state
      };

    default:
      return state;
  }
}
