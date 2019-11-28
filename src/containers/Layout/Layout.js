import React, {useState} from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";
import {connect} from "react-redux";

const Layout = (props ) => {
  const [ showSideDrawer, setSideDrawer ] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setSideDrawer(true);
  };

  const sideDrawerToggle = () => {
    setSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        drawerToggle={sideDrawerToggle}/>

      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        closed={sideDrawerCloseHandler}
        opened={sideDrawerOpenHandler}
        open={showSideDrawer}/>

      <main className={classes.Content}>
        {props.children}
      </main>
    </React.Fragment>
  )
};

const mapState2Props = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatch2Props = dispatch => {
  return {
    // onOrderBurger: (order, token) => dispatch(actions.purchaseBurger(order, token))
  }
};

export default connect(mapState2Props, mapDispatch2Props)(Layout);
