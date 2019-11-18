import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";

export const addIngr = (name) => {
  return {
    type: actionTypes.ADD_INGR,
    ingName: name
  }
};

export const delIngr = (name) => {
  return {
    type: actionTypes.DEL_INGR,
    ingName: name
  }
};

const setIngrs = (ingrs) => {
  return {
    type: actionTypes.SET_INGRS,
    ingrs: ingrs
  }
};

const fetchIngrsError = () => {
  return {
    type: actionTypes.FETCH_INGRS_ERROR
  }
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then((resp) => {
        dispatch(setIngrs(resp.data))
      })
      .catch((err) => {
        dispatch(fetchIngrsError())
      });
  }
};