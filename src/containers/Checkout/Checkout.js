import React from 'react';
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
import ContactData from "./ContactData";
import {connect} from "react-redux";


const Checkout = (props) => {
  const coCancelHandler = () => {
    props.history.goBack();
  };

  const coContinueHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/"/>;

  if (props.ings) {
    const purchRedir = props.purchased ? <Redirect to="/"/> : null;

    summary = (
      <div>
        {purchRedir}
        <CheckoutSummary ingredients={props.ings}
                         onCancel={coCancelHandler}
                         onContinue={coContinueHandler}/>
        <Route path={props.match.path + '/contact-data'}
               component={ContactData}/>
      </div>);
  }

  return summary;
};

const mapState2Props = state => {
  return {
    ings: state.burger.ingredients,
    purchased: state.order.purchased
  }
};

export default connect(mapState2Props)(Checkout);