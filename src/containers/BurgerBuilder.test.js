import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16'

import BuildController from "../components/Burger/BuildController/BuildController";

import {BurgerBuilder} from "./BurgerBuilder";

configure({ adapter: new Adapter() });


describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => null}/>);
  });


  it('should render BuildController with ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildController)).toHaveLength(1);
  });
});