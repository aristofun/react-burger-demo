import React, {Component} from 'react';
import Order from "../../components/OrderSummary/Order";
import axios from "../../axios-orders";
import WithErrorHandler from "../Layout/WithErrorHandler";


class OrderList extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios.get('/orders.json')
      .then((res) => {
        console.log(res.data);

        const fetchedOrders = [];

        for (let key in res.data)
          fetchedOrders.push({ ...res.data[key], id: key });

        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((err) => {

      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}/>))}
      </div>
    );
  }
}

export default WithErrorHandler(OrderList, axios);