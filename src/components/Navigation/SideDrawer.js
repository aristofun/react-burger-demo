import React, {Fragment} from 'react';

import classes from './SideDrawer.module.css';
import NavItems from "./NavItems";
import Backdrop from "../Visual/Backdrop";

const SideDrawer = (props) => {
  let attachClasses = [ classes.SideDrawer, classes.Close ];
  if (props.open) {
    attachClasses = [ classes.SideDrawer, classes.Open ];
  }

  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>

      <div className={attachClasses.join(' ')} onClick={props.closed}>
        <nav>
          <NavItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;