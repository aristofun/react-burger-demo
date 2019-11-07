import React, {Component} from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";


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
        <Toolbar drawerToggle={this.sideDrawerToggle}/>
        
        <SideDrawer closed={this.sideDrawerCloseHandler}
                    opened={this.sideDrawerOpenHandler}
                    open={this.state.showSideDrawer}/>

        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

export default Layout;
