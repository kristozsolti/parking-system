import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import FbLogin from './fbLogin';

class LoginModal extends Component {
    constructor() {
        super();
        this.state = {
            showModal: true
        }
    };
  
    close = () => {
        this.setState({ showModal: false });
      }
    
    open = () => {
        this.setState({ showModal: true });
    }
    
    render() {
        return (
            <Modal show={this.state.showModal} >
                <Modal.Header>
                    <Modal.Title>Please Log in with your Facebook account</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h4>In order to use this application, you need to log in with your Facebook account!</h4>
                </Modal.Body>
                <Modal.Footer>
                    <FbLogin getPersonFbData={this.props.getPersonFbData}/>
                </Modal.Footer>
            </Modal>
        );
    }
};

  export default LoginModal;