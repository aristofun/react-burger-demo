import React, {Fragment, useEffect, useState} from "react";
import Burger from "../components/Burger/Burger";
import BuildController from "../components/Burger/BuildController/BuildController";
import Modal from "../components/Visual/Modal";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Spinner from "../components/Visual/Spinner";
import axios from "../axios-orders";
import {connect, useDispatch, useSelector} from "react-redux";
import * as actions from '../store/actions';
import WithErrorHandler from "./Layout/WithErrorHandler";


const BurgerBuilder = (props) => {
    const [ purchasing, setPurchasing ] = useState(false);

    const dispatch = useDispatch();
    const onIngAdded = (ing) => dispatch(actions.addIngr(ing));
    const onIngDeleted = (ing) => dispatch(actions.delIngr(ing));
    const initIngredients = () => dispatch(actions.initIngredients());
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onAuthRedirect = (path) => dispatch(actions.setAuthRedirect(path));

    const ings = useSelector(state => state.burger.ingredients);
    const price = useSelector(state => state.burger.totalPrice);
    const error = useSelector(state => state.burger.error);
    const isAuthenticated = useSelector(state => !!state.auth.token);

    useEffect(() => initIngredients(), []);

    const purchaseHandler = () => {
      if (isAuthenticated) setPurchasing(true);
      else {
        onAuthRedirect('/checkout');
        props.history.push('/auth');
      }
    };

    const purchaseContinueHandler = () => {
      onInitPurchase();
      props.history.push('/checkout');
    };

    const updatePurchase = (ingrs) => {
      const sum = Object.keys(ingrs).map(igKey => ingrs[igKey]).reduce((sum, el) => sum + el, 0);
      return sum > 0;
    }

    const disabledInfo = {
      ...ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    let order = <Spinner/>;
    let burger = <Spinner/>;

    if (ings) {
      order = <OrderSummary
        ingredients={ings}
        cancelled={() => setPurchasing(false)}
        continued={purchaseContinueHandler}
        price={price}
      />;

      burger =
        <Fragment>
          <Burger ingredients={ings}/>
          <BuildController
            disabled={disabledInfo}
            ingredientAdded={onIngAdded}
            ingredientRemoved={onIngDeleted}
            price={price}
            purchaseable={updatePurchase(ings)}
            ordered={purchaseHandler}
            isAuthenticated={isAuthenticated}
          />
        </Fragment>
    }

    if (error) burger = <p>Couldn't load ingredients</p>

    return (
      <Fragment>

        {burger}
        <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
          {order}
        </Modal>
      </Fragment>
    );
  }
;

export default connect()(WithErrorHandler(BurgerBuilder, axios));