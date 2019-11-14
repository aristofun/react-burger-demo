import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildController from "../../components/Burger/BuildController/BuildController";
import Modal from "../../components/Visual/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/Visual/Spinner";
import WithErrorHandler from "../Layout/WithErrorHandler";
import axios from "../../axios-orders";


const ING_PRICES = {
  salad: 0.5,
  cheese: 0.8,
  bacon: 1,
  meat: 1.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios.get('/ingredients.json')
      .then((resp) => {
        this.setState({ ingredients: resp.data });
        this.updatePurchase(resp.data);
      })
      .catch((err) => {
        console.log('No ingredients', err);
      });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const qParams = [];
    for (let i in this.state.ingredients) {
      qParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    qParams.push('price=' + this.state.totalPrice);
    const qs = qParams.join('&');

    this.props.history.push({ pathname: '/checkout', search: qs });
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

    let order = <Spinner/>;

    if (!this.state.loading && this.state.ingredients) {
      order = <OrderSummary
        ingredients={this.state.ingredients}
        cancelled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />
    }

    let burger = <Spinner/>;

    if (this.state.ingredients) {
      burger =
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
        </Fragment>
    }

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

export default WithErrorHandler(BurgerBuilder, axios);