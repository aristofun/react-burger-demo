import React, {useState} from 'react';
import Button from "../../components/Visual/Button";
import Spinner from "../../components/Visual/Spinner";

import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import WithErrorHandler from "../../containers/Layout/WithErrorHandler";
import * as actions from '../../store/actions';

import Input from "./Input";
import {connect} from "react-redux";


const ContactData = (props) => {
  const [ form, setForm ] = useState({
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
  });

  const [ isValid, setValid ] = useState(false);

  const coHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (let formId in form) {
      formData[formId] = form[formId].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules && rules.required) isValid = value.trim() !== '';
    return isValid;
  };

  const inputChangedHandler = (inputId, event) => {
    const updForm = {
      ...form
    };

    const updEl = { ...updForm[inputId] };

    updEl.value = event.target.value;
    updEl.valid = checkValidity(updEl.value, updEl.validation);
    updEl.touched = true;
    updForm[inputId] = updEl;

    let formValid = true;

    for (let inpId in updForm) {
      formValid = formValid && updForm[inpId].valid
    }

    setForm(updForm);
    setValid(formValid);
  };

  const formels = [];

  for (let key in form) {
    formels.push({
      id: key,
      config: form[key],
    });
  }

  let formComponent = (<Spinner/>);

  if (!props.loading)
    formComponent =
      (<div className={classes.ContactData}>
        <h4>Enter your contacts</h4>
        <form action="">
          {formels.map(el => (
            <Input key={el.id}
                   elementType={el.config.elementType} elementConfig={el.config.elementConfig}
                   value={el.config.value}
                   invalid={!el.config.valid}
                   onChange={inputChangedHandler.bind(this, el.id)}
                   touched={el.config.touched}/>))}
          <Button type="Success"
                  disabled={!isValid}
                  onClick={coHandler}>Order</Button>
        </form>
      </div>);


  return formComponent;
};

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