import React, {Component} from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 100
  };

  componentWillMount() {
    const q = new URLSearchParams(this.props.location.search);
    const ingr = {};
    let price = 0;

    for (let param of q.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingr[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingr, totalPrice: price });
  }


  coCancelHandler = () => {
    this.props.history.goBack();
  };

  coContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    console.log('Checkout', this.state.totalPrice);

    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
                         onCancel={this.coCancelHandler}
                         onContinue={this.coContinueHandler}/>
        <Route path={this.props.match.path + '/contact-data'}
               render={() => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>)}/>
      </div>
    );
  }
}

export default Checkout;