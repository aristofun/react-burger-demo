import * as actionTypes from '../actions/actionTypes'

const initState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log('order reducer', action, state);

      const newOrder = {
        ...action.data,
        id: action.orderId
      };

      console.log(newOrder);
      console.log(state.orders.concat(newOrder));

      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default reducer;