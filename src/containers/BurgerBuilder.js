import React, {Component, Fragment} from "react";
import Burger from "../components/Burger/Burger";
import BuildController from "../components/Burger/BuildController/BuildController";
import Modal from "../components/Visual/Modal";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Spinner from "../components/Visual/Spinner";
import axios from "../axios-orders";
import {connect} from "react-redux";
import * as actions from '../store/actions';
import WithErrorHandler from "./Layout/WithErrorHandler";


export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onAuthRedirect('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  updatePurchase(ingrs) {
    const sum = Object.keys(ingrs).map(igKey => ingrs[igKey]).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    let order = <Spinner/>;
    let burger = <Spinner/>;

    if (this.props.ings) {
      order = <OrderSummary
        ingredients={this.props.ings}
        cancelled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
        price={this.props.price}
      />;

      burger =
        <Fragment>
          <Burger ingredients={this.props.ings}/>
          <BuildController
            disabled={disabledInfo}
            ingredientAdded={this.props.onIngAdded}
            ingredientRemoved={this.props.onIngDeleted}
            price={this.props.price}
            purchaseable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Fragment>
    }

    if (this.props.error) burger = <p>Couldn't load ingredients</p>

    return (
      <Fragment>

        {burger}
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {order}
        </Modal>
      </Fragment>
    );
  }
}

const mapState2Props = state => {
  return {
    ings: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatch2Props = dispatch => {
  return {
    onIngAdded: (ing) => dispatch(actions.addIngr(ing)),
    onIngDeleted: (ing) => dispatch(actions.delIngr(ing)),
    initIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
  }
};

export default connect(mapState2Props, mapDispatch2Props)(WithErrorHandler(BurgerBuilder, axios));