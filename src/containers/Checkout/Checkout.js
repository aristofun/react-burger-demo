import React, {Component} from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData";
import {connect} from "react-redux";
import * as actions from "../../store/actions";


class Checkout extends Component {
  coCancelHandler = () => {
    this.props.history.goBack();
  };

  coContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    console.log('Checkout', this.props.price);

    let summary = <Redirect to="/"/>;

    if (this.props.ings) {
      const purchRedir = this.props.purchased ? <Redirect to="/"/> : null;

      summary = (
        <div>
          {purchRedir}
          <CheckoutSummary ingredients={this.props.ings}
                           onCancel={this.coCancelHandler}
                           onContinue={this.coContinueHandler}/>
          <Route path={this.props.match.path + '/contact-data'}
                 component={ContactData}/>
        </div>);
    }

    return summary;
  }
}

const mapState2Props = state => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased
  }
};

export default connect(mapState2Props)(Checkout);