import React from 'react';

import classes from './Item.module.css';
import {NavLink} from "react-router-dom";

const Item = (props) => {
  return (
    <li className={classes.Item}>
      <NavLink to={props.link}
               className={props.active ? classes.active : null}
               activeClassName={classes.active}
               exact>
        {props.children}
      </NavLink>
    </li>
  );
};

export default Item;