import React, {Component} from 'react';
import Order from "../../components/OrderSummary/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../Layout/WithErrorHandler";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import Spinner from "../../components/Visual/Spinner";


class OrderList extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner/>;

    if (!this.props.loading)
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}/>))}
        </div>);
    return orders;
  }
}

const mapState2Props = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
};

const mapDispatch2Props = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
};

export default connect(mapState2Props, mapDispatch2Props)(WithErrorHandler(OrderList, axios));