import React from 'react';

import classes from './NavItems.module.css';
import Item from "./Item";

const NavItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <Item link='/' active>Burger builder</Item>
      <Item link='/'>Checkout</Item>
    </ul>
  );
};

export default NavItems;