import React from 'react';

import classes from './Buterbrod.module.css';

const Buterbrod = (props) => {
  return (
    <div onClick={props.onClick} className={classes.Buterbrod}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Buterbrod;