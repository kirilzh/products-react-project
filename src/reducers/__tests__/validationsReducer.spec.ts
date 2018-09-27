import { Reducer } from "redux-testkit";
import validations, {
  VALIDATIONS_FETCH_REQUEST,
  VALIDATIONS_FETCH_SUCCESS,
  VALIDATIONS_FETCH_FAILURE,
  initialState
} from "../validations";

const validationsDataMock: any = {
  name: "^[a-zA-Z0-9 ]+$",
  price: "^[0-\\.9]+$",
  currency: "^[A-Z]+$"
};

const validationsErrorMock: string = "golqm problem";

describe("Validations Reducer", () => {
  it("should request for validations", () => {
    const action = { type: VALIDATIONS_FETCH_REQUEST };

    Reducer(validations)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: true
      });
  });

  it("should receive validations", () => {
    const action = {
      type: VALIDATIONS_FETCH_SUCCESS,
      validations: validationsDataMock
    };
    Reducer(validations)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: false,
        data: validationsDataMock
      });
  });

  it("should receive error on failed request", () => {
    const action = {
      type: VALIDATIONS_FETCH_FAILURE,
      error: validationsErrorMock
    };
    Reducer(validations)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: false,
        data: null,
        error: validationsErrorMock
      });
  });

  it("should return default state if no match", () => {
    const action = { type: "default" };

    Reducer(validations)
      .expect(action)
      .toReturnState({
        ...initialState
      });
  });
});
