import React, {Component} from 'react';
import Button from "../../components/Visual/Button";
import Spinner from "../../components/Visual/Spinner";

import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import WithErrorHandler from "../../containers/Layout/WithErrorHandler";
import * as actions from '../../store/actions';

import Input from "./Input";
import {connect} from "react-redux";


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your name' },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your street adress' },
        value: ''
      },

      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Email' },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', display: 'Fastest' },
            { value: 'cheapest', display: 'Cheapest' },
          ]
        },
        value: 'fastest',
        valid: true
      },
    },
    formIsValid: false,
  };

  coHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formId in this.state.orderForm) {
      formData[formId] = this.state.orderForm[formId].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules && rules.required) isValid = value.trim() !== '';
    return isValid;
  };

  inputChangedHandler = (inputId, event) => {
    const updForm = {
      ...this.state.orderForm
    };

    const updEl = { ...updForm[inputId] };

    updEl.value = event.target.value;
    updEl.valid = this.checkValidity(updEl.value, updEl.validation);
    updEl.touched = true;
    updForm[inputId] = updEl;

    let formValid = true;

    for (let inpId in updForm) {
      formValid = formValid && updForm[inpId].valid
    }

    this.setState({ orderForm: updForm, formIsValid: formValid });
  };

  render() {
    const formels = [];

    for (let key in this.state.orderForm) {
      formels.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (<Spinner/>);

    if (!this.props.loading)
      form =
        (<div className={classes.ContactData}>
          <h4>Enter your contacts</h4>
          <form action="">
            {formels.map(el => (
              <Input key={el.id}
                     elementType={el.config.elementType} elementConfig={el.config.elementConfig}
                     value={el.config.value}
                     invalid={!el.config.valid}
                     onChange={this.inputChangedHandler.bind(this, el.id)}
                     touched={el.config.touched}/>))}
            <Button type="Success"
                    disabled={!this.state.formIsValid}
                    onClick={this.coHandler}>Order</Button>
          </form>
        </div>);


    return form;
  }
}

const mapState2Props = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
};

const mapDispatch2Props = dispatch => {
  return {
    onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token))
  }
};

export default connect(mapState2Props, mapDispatch2Props)(WithErrorHandler(ContactData, axios));