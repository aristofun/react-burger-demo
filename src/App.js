import React, {Component} from 'react';
import BurgerBuilder from "./containers/BurgerBuilder";
import Layout from "./containers/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import OrderList from "./containers/OrderList";
import Auth from "./containers/Auth";
import Logout from "./containers/Logout";
import * as actions from "./store/actions";
import {connect} from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch>);

    if (this.props.isAuthenticated)
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={OrderList}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>);

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>)
  }
}

const mapState2Props = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatch2Props = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
};
export default withRouter(connect(mapState2Props, mapDispatch2Props)(App));
