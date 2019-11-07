import React from 'react';
import classes from "./BuildController.module.css";
import Control from "./Control/Control";

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildController = (props) => {
  return (
    <div className={classes.BuildController}>
      <p>Price: $<strong>{props.price.toFixed(2)}</strong></p>

      {controls.map(ctrl => (
        <Control
          key={ctrl.label}
          label={ctrl.label}
          added={props.ingredientAdded.bind(this, ctrl.type)}
          removed={props.ingredientRemoved.bind(this, ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!props.purchaseable}
              onClick={props.ordered}>Order now
      </button>
    </div>
  );
};

export default BuildController;