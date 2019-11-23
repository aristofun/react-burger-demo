import React from 'react';

import classes from './NavItems.module.css';
import Item from "./Item";

const NavItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <Item link='/'>Burger builder</Item>
      {props.isAuthenticated ? <Item link='/orders'>Orders</Item> : null}

      {props.isAuthenticated
        ? <Item link='/logout'>Log out</Item>
        : <Item link='/auth'>Log in</Item>}
    </ul>
  );
};

export default NavItems;