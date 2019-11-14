import React, {Component} from 'react';
import Button from "../../components/Visual/Button";
import Spinner from "../../components/Visual/Spinner";

import classes from "./ContactData.module.css";
import axios from "../../axios-orders";
import {withRouter} from "react-router-dom";
import Input from "./Input";


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
        value: '',
        valid: true
      },
    },

    formIsValid: false,
    loading: false
  };

  coHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};

    for (let formId in this.state.orderForm) {
      formData[formId] = this.state.orderForm[formId].value;
    }

    console.log(this.props.totalPrice);
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ loading: false });
      })
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

    if (!this.state.loading)
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

export default withRouter(ContactData);