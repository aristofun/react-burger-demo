import React, {Fragment} from 'react';

import classes from './OrderSummary.module.css';
import Button from "../Visual/Button";

const OrderSummary = (props) => {
  const ings = Object.keys(props.ingredients)
    .map(igKey => <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
      {props.ingredients[igKey]}</li>);

  return (
    <Fragment>
      <h3>Your order</h3>
      <p>Nice burger with ingredients:</p>
      <ul>
        {ings}
      </ul>

      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>

      <Button btnType='Danger' onClick={props.cancelled}>Cancel</Button>
      <Button btnType='Success' onClick={props.continued}>Continue</Button>
    </Fragment>
  );
};

export default OrderSummary;