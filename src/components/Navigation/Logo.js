import React from 'react';

import classes from './Logo.module.css';

import logoPng from "../../assets/images/burger-logo.png";


const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={logoPng} alt="Burger-Prince"/>
    </div>
  );
};

export default Logo;