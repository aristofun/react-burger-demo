import React, {Fragment, Component} from 'react';

import classes from './OrderSummary.module.css';
import Button from "../Visual/Button";

class OrderSummary extends Component {
  render() {                   
    const ings = Object.keys(this.props.ingredients)
      .map(igKey => <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
        {this.props.ingredients[igKey]}</li>);

    return (
      <Fragment>
        <h3>Your order</h3>
        <p>Nice burger with ingredients:</p>
        <ul>
          {ings}
        </ul>

        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>

        <Button btnType='Danger' onClick={this.props.cancelled}>Cancel</Button>
        <Button btnType='Success' onClick={this.props.continued}>Continue</Button>
      </Fragment>
    );
  }
}

export default OrderSummary;