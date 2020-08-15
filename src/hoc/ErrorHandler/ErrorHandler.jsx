import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (ChildComponent, axiosInstance) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                error: null
            }
            this.reqInstance = axiosInstance.interceptors.request;
            this.resInstance = axiosInstance.interceptors.response;
        }

        componentDidMount() {
            this.reqInstance.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.resInstance.use(null, error => {
                this.setState({ error: error })
            });
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.reqInstance);
            axiosInstance.interceptors.response.eject(this.resInstance);
        }

        errorCloseHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <React.Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorCloseHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <ChildComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default errorHandler;