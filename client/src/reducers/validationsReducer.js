// fetch validations action types
const VALIDATIONS_FETCH_REQUEST = "VALIDATIONS_FETCH_REQUEST";
const VALIDATIONS_FETCH_SUCCESS = "VALIDATIONS_FETCH_SUCCESS";
const VALIDATIONS_FETCH_FAILURE = "VALIDATIONS_FETCH_FAILURE";

const initialState = {
  data: null,
  fetching: false,
  error: null
};


export default function validationsReducer(state = initialState, action) {
  switch (action.type) {
    case VALIDATIONS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case VALIDATIONS_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.validations
      };

    case VALIDATIONS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      };

    default:
      return state;
  }
}
