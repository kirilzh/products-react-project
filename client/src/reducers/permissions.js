import fetchPermissions from "../actions/permissionActions";
const initialState = {};

export default function permissions(state = initialState, action) {
  switch (action.type) {
    case "GET":
      return (state = fetchPermissions);

    default:
      return state;
  }
}
