import * as actionTypes from '../actions/actionTypes'
import {updateObj} from "../utils";

const ING_PRICES = {
  salad: 0.5,
  cheese: 0.8,
  bacon: 1,
  meat: 1.5,
};


const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const reducerOrder = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGR:

      const updIngrs = updateObj(
        state.ingredients,
        { [action.ingName]: state.ingredients[action.ingName] + 1 }
      );

      return updateObj(state, {
        ingredients: updIngrs,
        totalPrice: state.totalPrice + ING_PRICES[action.ingName]
      });

    case actionTypes.DEL_INGR:
      const newVal = state.ingredients[action.ingName] - 1;

      return {
        ...state, ingredients: {
          ...state.ingredients,
          [action.ingName]: newVal < 0 ? 0 : newVal
        },
        totalPrice: state.totalPrice - ING_PRICES[action.ingName]
      };

    case actionTypes.SET_INGRS:
      return {
        ...state,
        ...initState,
        ingredients: action.ingrs
      };

    case  actionTypes.FETCH_INGRS_ERROR:
      return {
        ...state,
        error: true
      };
      
    default:
      return state;
  }
};

export default reducerOrder;