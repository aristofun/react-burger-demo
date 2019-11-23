import React, {Component} from 'react';
import Input from "./Checkout/Input";
import Button from "../components/Visual/Button";
import classes from "./Auth.module.css";
import * as actions from '../store/actions'
import {connect} from "react-redux";
import Spinner from "../components/Visual/Spinner";
import {Redirect} from "react-router-dom";


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Email' },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },

      password: {
        elementType: 'input',
        elementConfig: { type: 'password', placeholder: 'Password' },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignup: true
  };


  checkValidity = (value, rules) => {
    if (!rules) return true;

    let isValid = true;

    if (rules.required) isValid = value.trim() !== '';

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules && rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    return isValid;
  };

  inputChangedHandler = (controlName, event) => {
    const updForm = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({ controls: updForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    });
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirect !== '/'){
      this.props.onSetAuthRedirect('/');
    }
  }

  render() {
    const formels = [];

    for (let key in this.state.controls) {
      formels.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = <Spinner/>;

    if (!this.props.loading)
      form = formels.map(el => (
        <Input key={el.id}
               elementType={el.config.elementType}
               elementConfig={el.config.elementConfig}
               value={el.config.value}
               invalid={!el.config.valid}
               onChange={this.inputChangedHandler.bind(this, el.id)}
               touched={el.config.touched}/>
      ));

    let errorMsg = null;

    if (this.props.error)
      errorMsg = (
        <p>{this.props.error.message}</p>
      );

    let redir = null;

    if (this.props.isAuthenticated) redir = <Redirect to={this.props.authRedirect}/>;

    return (
      <div className={classes.Auth}>
        {errorMsg}
        {redir}
        <form action="" onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>

        <Button
          onClick={this.switchAuthModeHandler}
          btnType="Danger">Switch t o {this.state.isSignup ? 'Log in' : 'Sign up'}</Button>
      </div>
    );
  }
}

const mapState2Props = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.token,
    building: state.burger.building,
    authRedirect: state.auth.authRedirect
  }
};

const mapDispatch2Props = (dispatch) => {
  return {
    onAuth: (email, pw, isSignup) => dispatch(actions.auth(email, pw, isSignup)),
    onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
  }
};

export default connect(mapState2Props, mapDispatch2Props)(Auth);