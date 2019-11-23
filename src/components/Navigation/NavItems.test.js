import React from 'react';

import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import NavItems from "./NavItems";
import Item from "./Item";

configure({ adapter: new Adapter() });


describe('<NavItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems/>);
  });


  it('should render 2 items if not authed', () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });

  it('should render 3 items if authed', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(Item)).toHaveLength(3);
    expect(wrapper.contains(<Item link='/logout'>Log out</Item>)).toBe(true);
  });
});