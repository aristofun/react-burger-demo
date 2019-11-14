import React, {Fragment, Component} from 'react';

import Modal from "../../components/Visual/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor(args) {
      super(args);
      this.reqIC = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.respIC = axios.interceptors.response.use(null, error => {
        this.setState({ error });
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIC);
      axios.interceptors.response.eject(this.respIC);
    }

    errorShown = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error}
                 modalClosed={this.errorShown}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Fragment>
      );
    }
  }
};

export default WithErrorHandler;