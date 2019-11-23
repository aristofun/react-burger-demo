import reducer from "./auth";
import * as actionTypes from '../actions/actionTypes'


describe('auth reducer', () => {
  const iniState = {
    token: null,
    loading: false,
    userId: null,
    error: null,
    authRedirect: '/'
  };

  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(iniState);
  });

  it('should store token on login', () => {
    expect(reducer(iniState, { type: actionTypes.AUTH_SUCCESS, idToken: 42 })).toMatchObject({
      token: 42
    })
  });

});