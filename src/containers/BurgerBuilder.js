import React, {Fragment, useEffect, useState} from "react";
import Burger from "../components/Burger/Burger";
import BuildController from "../components/Burger/BuildController/BuildController";
import Modal from "../components/Visual/Modal";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Spinner from "../components/Visual/Spinner";
import axios from "../axios-orders";
import {connect} from "react-redux";
import * as actions from '../store/actions';
import WithErrorHandler from "./Layout/WithErrorHandler";


const BurgerBuilder = (props) => {
  const [ purchasing, setPurchasing ] = useState(false);

  useEffect(() => {
    props.initIngredients();
  }, []);

  const purchaseHandler = () => {
    if (props.isAuthenticated) setPurchasing(true);
    else {
      props.onAuthRedirect('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const updatePurchase = (ingrs) => {
    const sum = Object.keys(ingrs).map(igKey => ingrs[igKey]).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  const disabledInfo = {
    ...props.ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] < 1;
  }

  let order = <Spinner/>;
  let burger = <Spinner/>;

  if (props.ings) {
    order = <OrderSummary
      ingredients={props.ings}
      cancelled={() => setPurchasing(false)}
      continued={purchaseContinueHandler}
      price={props.price}
    />;

    burger =
      <Fragment>
        <Burger ingredients={props.ings}/>
        <BuildController
          disabled={disabledInfo}
          ingredientAdded={props.onIngAdded}
          ingredientRemoved={props.onIngDeleted}
          price={props.price}
          purchaseable={updatePurchase(props.ings)}
          ordered={purchaseHandler}
          isAuthenticated={props.isAuthenticated}
        />
      </Fragment>
  }

  if (props.error) burger = <p>Couldn't load ingredients</p>

  return (
    <Fragment>

      {burger}
      <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
        {order}
      </Modal>
    </Fragment>
  );
};

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