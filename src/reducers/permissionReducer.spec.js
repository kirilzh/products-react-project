import { Reducer } from 'redux-testkit';
import permissions from 'permissionsReducer';

describe('reducer', () => {
  it('should do something', () => {
    const action = { type: "PERMISSION_FETCH_REQUEST" };
    const result = {
      data: null,
      fetching: true,
      error: null
    };
    Reducer(permissions).expect(action).toReturnState(result);
  })
});
