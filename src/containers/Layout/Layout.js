import React, {Component} from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";
import {connect} from "react-redux";


class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sideDrawerToggle = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    });
  };


  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          drawerToggle={this.sideDrawerToggle}/>

        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          closed={this.sideDrawerCloseHandler}
          opened={this.sideDrawerOpenHandler}
          open={this.state.showSideDrawer}/>

        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

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
