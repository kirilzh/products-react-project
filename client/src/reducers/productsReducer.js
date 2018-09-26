export const CHANGE_ACTION = "CHANGE_ACTION";

// FETCHING FROM API
const PRODUCTS_FETCH_REQUEST = "PRODUCTS_FETCH_REQUEST";
const PRODUCTS_FETCH_SUCCESS = "PRODUCTS_FETCH_SUCCESS";
const PRODUCTS_FETCH_FAILURE = "PRODUCTS_FETCH_FAILURE";

const initialState = {
  fetching: false,
  data: null,
  error: null,
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
    },
    error: {
      name: true,
      price: true,
      currency: true
    }
  }
};

export default function productsReducer(state = initialState, action) {
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
      return {
        ...state,
        temporary: {
          ...state.temporary,
          [action.field]: {
            value: action.value,
            valid: action.valid
          },
          error: {
            ...state.temporary.error,
            [action.field]: action.valid
          }
        }
      };

    default:
      return state;
  }
}
