import * as actionTypes from './actionTypes'
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const auth = (email, pw, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: pw,
      returnSecureToken: true
    };

    const apiKey = 'AIzaSyC0OCbNsuxFrPzirUk2YlPCPdejISHDsZQ';

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    if (isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    axios.post(url, authData)
      .then((resp) => {
        console.log(resp);
        dispatch(authSuccess(resp.data));
        const expirationDate = new Date(new Date().getTime() + 1000 * resp.data.expiresIn);
        localStorage.setItem('token', resp.data.idToken);
        localStorage.setItem('userId', resp.data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(checkAuthTimeout(resp.data.expiresIn));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.error));
      });

  }
};

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.INIT_LOGOUT
  }
};

export const checkAuthTimeout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, 1000 * time);
  }
};


export const setAuthRedirect = (path) => {
  return {
    type:
    actionTypes.SET_AUTH_REDIRECT,
    path: path
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expTime = new Date(localStorage.getItem('expirationDate'));
      const localId = localStorage.getItem('userId');

      if (expTime <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess({
          idToken: token,
          localId: localId
        }));

        dispatch(checkAuthTimeout((expTime.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
};
