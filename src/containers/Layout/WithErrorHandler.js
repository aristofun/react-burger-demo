import React, {Fragment, useEffect, useState} from 'react';

import Modal from "../../components/Visual/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [ error, setError ] = useState(null);

    const reqIC = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const respIC = axios.interceptors.response.use(null, err => {
      setError(err);
    });

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqIC);
        axios.interceptors.response.eject(respIC);
      }
    }, [ reqIC, respIC ]);

    const errorShown = () => {
      setError(null);
    };

    return (
      <Fragment>
        <Modal show={error}
               modalClosed={errorShown}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}/>
      </Fragment>
    );
  }
};

export default withErrorHandler;