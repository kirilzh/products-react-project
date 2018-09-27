import { Reducer } from "redux-testkit";
import permissions from "../permissions";

const initialState: any = {
  data: null,
  fetching: false,
  error: null
};

const permissionsDataMock: any = {
  _id: "5b965706e7179a73d4910414",
  name: "ADD",
  visible: true
};

const permissionsErrorMock: string = "golqm problem";

describe("Permissions Reducer", () => {
  it("should reqeust for permissions", () => {
    const action = { type: "PERMISSIONS_FETCH_REQUEST" };

    Reducer(permissions)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: true
      });
  });

  it("receive permissions", () => {
    const action = { type: "PERMISSIONS_FETCH_SUCCESS", permissions: permissionsDataMock };
    Reducer(permissions)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: false,
        data: permissionsDataMock
      });
  });

  it("should receive error on failed request", () => {
    const action = { type: "PERMISSIONS_FETCH_FAILURE", error: permissionsErrorMock };
    Reducer(permissions)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: false,
        data: null,
        error: permissionsErrorMock
      });
  });

  it("should return default state if no match", () => {
    const action = { type: "default" };

    Reducer(permissions)
      .expect(action)
      .toReturnState({
        ...initialState
      });
  });
});
