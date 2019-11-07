import React from 'react';

import classes from './Toolbar.module.css';
import Logo from "./Logo";
import NavItems from "./NavItems";
import Buterbrod from "./Buterbrod";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <Buterbrod onClick={props.drawerToggle}/>

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavItems/>
      </nav>
    </header>
  );
};

export default Toolbar;