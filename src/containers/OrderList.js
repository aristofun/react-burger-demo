import React, {useEffect} from 'react';
import Order from "../components/OrderSummary/Order";
import axios from "../axios-orders";
import WithErrorHandler from "./Layout/WithErrorHandler";
import * as actions from "../store/actions";
import {connect} from "react-redux";
import Spinner from "../components/Visual/Spinner";

const OrderList = (props) => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  let orders = <Spinner/>;

  if (!props.loading)
    orders = (
      <div>
        {props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>))}
      </div>);
  return orders;
};

const mapState2Props = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatch2Props = dispatch => {
  return {
    onFetchOrders: (token, uid) => dispatch(actions.fetchOrders(token, uid))
  }
};

export default connect(mapState2Props, mapDispatch2Props)(WithErrorHandler(OrderList, axios));