import React from "react";

import classes from "./Burger.module.css";
import Ingridient from "./Ingridient/Ingridient";

const Burger = (props) => {
  let items = Object.keys(props.ingredients).map(igKey => {
    return Array(props.ingredients[igKey]).fill().map(
      (_, i) => <Ingridient type={igKey} key={igKey + i}/>
    );
  })
    .reduce((arr, el) => arr.concat(el), []);

  if (items.length < 1) {
    items = <p>Please add some ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <Ingridient type='bread-top'/>
      {items}
      <Ingridient type='bread-bottom'/>
    </div>
  );
};

export default Burger;