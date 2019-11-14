import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from "../Burger/Burger";
import Button from "../Visual/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Bete avon</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients}/>
      </div>

      <Button btnType="Danger" onClick={props.onCancel}>Cancel</Button>
      <Button btnType="Success" onClick={props.onContinue}>Go!</Button>
    </div>
  );
};

export default CheckoutSummary;