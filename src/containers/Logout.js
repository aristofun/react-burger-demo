import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as actions from "../store/actions";
import {Redirect} from "react-router-dom";


const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);
  return <Redirect to="/"/>;
};


const mapDispatch2Props = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  }
};

export default connect(null, mapDispatch2Props)(Logout);