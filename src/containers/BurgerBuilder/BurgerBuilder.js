import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildController from "../../components/Burger/BuildController/BuildController";
import Modal from "../../components/Visual/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const ING_PRICES = {
  salad: 0.5,
  cheese: 0.8,
  bacon: 1,
  meat: 1.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('Not implemented yet');
  };

  updatePurchase(ingrs) {
    const sum = Object.keys(ingrs).map(igKey => ingrs[igKey]).reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const newCount = this.state.ingredients[type] + 1;
    const updIg = {
      ...this.state.ingredients
    };

    updIg[type] = newCount;
    const price = ING_PRICES[type] + this.state.totalPrice;
    this.setState({ totalPrice: price, ingredients: updIg });
    this.updatePurchase(updIg);
  };

  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] < 1) return;

    const newCount = this.state.ingredients[type] - 1;
    const updIg = {
      ...this.state.ingredients
    };

    updIg[type] = newCount;
    const price = this.state.totalPrice - ING_PRICES[type];
    this.setState({ totalPrice: price, ingredients: updIg });
    this.updatePurchase(updIg);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildController
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />

        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelled={this.purchaseCancelHandler}
            continued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default BurgerBuilder;