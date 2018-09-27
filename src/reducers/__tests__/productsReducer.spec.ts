import products, {
  initialState,
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAILURE,
  CHANGE_ACTION
} from "../productsReducer";
import { Reducer } from "redux-testkit";

const productsDataMock = {
  _id: "5b96634c2d87db15d3529b44",
  name: "HDD",
  price: 150,
  currency: "BGN"
};

const productsErrorMock: string = "golqm error";

describe("products reducer", () => {
  it("should request for products", () => {
    const action = { type: PRODUCTS_FETCH_REQUEST };

    Reducer(products)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: true,
        error: null
      });
  });

  it("should receive products", () => {
    const action = { type: PRODUCTS_FETCH_SUCCESS, products: productsDataMock };

    Reducer(products)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: false,
        data: productsDataMock
      });
  });

  it("should receive error on failed request", () => {
    const action = { type: PRODUCTS_FETCH_FAILURE, error: productsErrorMock };

    Reducer(products)
      .expect(action)
      .toReturnState({
        ...initialState,
        fetching: false,
        error: productsErrorMock
      });
  });

  it("should return the default state if an action is not dispatched", () => {
    const action = { type: "default" };

    Reducer(products)
      .expect(action)
      .toReturnState({
        ...initialState
      });
  });

  it("should update the temporary object", () => {
    const action = {
      type: CHANGE_ACTION,
      field: name,
      value: 123,
      valid: false
    };

    Reducer(products).expect(action).toReturnState({
      ...initialState,
      temporary: {
        ...initialState.temporary,
        [action.field]: {
          value: action.value,
          valid: action.valid
        },
        error: {
          ...initialState.temporary.error,
          [action.field]: action.valid
        }
      }
    });
  });
});
