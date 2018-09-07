const TOGGLE_BUTTON = "TOGGLE_BUTTON";

// fetch permissions action types
const PERMISSIONS_FETCH_REQUEST = "PERMISSIONS_FETCH_REQUEST";
const PERMISSIONS_FETCH_SUCCESS = "PERMISSIONS_FETCH_SUCCESS";
const PERMISSIONS_FETCH_FAILURE = "PERMISSIONS_FETCH_FAILURE";

const initialState = {
  data: null,
  fetching: false,
  error: null
};


export default function permissionsReducer(state = initialState, action) {
  switch (action.type) {
    case PERMISSIONS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case PERMISSIONS_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.permissions
      };

    case PERMISSIONS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      };

    case TOGGLE_BUTTON:
      const updatedPermission = state.data.map((permission, i) => {
        if (i === action.index) {
          return {
            ...permission,
            visible: !permission.visible
          };
        }
        return permission;
      });

      return {
        data: updatedPermission
      };

    default:
      return state;
  }
}
