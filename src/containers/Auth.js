import React, {useEffect, useState} from 'react';
import Input from "./Checkout/Input";
import Button from "../components/Visual/Button";
import classes from "./Auth.module.css";
import * as actions from '../store/actions'
import {connect} from "react-redux";
import Spinner from "../components/Visual/Spinner";
import {Redirect} from "react-router-dom";


const Auth = (props) => {
  const [ controls, setControls ] = useState({
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
    }
  });

  const [ isSignup, setSignup ] = useState(false);

  const checkValidity = (value, rules) => {
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

  const inputChangedHandler = (controlName, event) => {
    const updForm = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true
      }
    };

    setControls(updForm);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setSignup(!isSignup);
  };

  useEffect(() => {
    if (!props.building && props.authRedirect !== '/') {
      props.onSetAuthRedirect('/');
    }
  }, []);

  const formels = [];

  for (let key in controls) {
    formels.push({
      id: key,
      config: controls[key],
    });
  }

  let form = <Spinner/>;

  if (!props.loading)
    form = formels.sort((a, b) => a.config.elementConfig.type > b.config.elementConfig.type ? 1 : -1).map(el => (
      <Input key={el.id}
             id={el.id}
             elementType={el.config.elementType}
             elementConfig={el.config.elementConfig}
             value={el.config.value}
             invalid={!el.config.valid}
             onChange={inputChangedHandler.bind(this, el.id)}
             touched={el.config.touched}/>
    ));

  let errorMsg = null;

  if (props.error)
    errorMsg = (
      <p>{props.error.message}</p>
    );

  let redir = null;

  if (props.isAuthenticated) redir = <Redirect to={props.authRedirect}/>;

  return (
    <div className={classes.Auth}>
      {errorMsg}
      {redir}
      <form action="" onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>

      <Button
        onClick={switchAuthModeHandler}
        btnType="Danger">Switch t o {isSignup ? 'Log in' : 'Sign up'}</Button>
    </div>
  );
};

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