import React, {Fragment} from 'react';

import Modal from "../../components/Visual/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [ error, errorShown ] = useHttpErrorHandler(axios);

    return (
      <Fragment>
        <Modal show={error} modalClosed={errorShown}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}/>
      </Fragment>
    );
  }
};

export default withErrorHandler;