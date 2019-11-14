import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
  const ingr = [];

  for (let ingName in props.ingredients) {
    ingr.push({ name: ingName, amount: props.ingredients[ingName] });
  }

  const ingrString = ingr.map(ig => {
    return <span key={ig.name}
                 style={{
                   textTransform: 'capitalize',
                   display: 'inline-block',
                   margin: '0 8px',
                   border: '1px solid #ccc',
                   padding: '5px'
                 }}>{ig.name} ({ig.amount})</span>
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingrString}</p>

      <p>Price: <strong>${props.price}</strong></p>
    </div>
  );
};

export default Order;