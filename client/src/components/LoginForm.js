import React from 'react';
import {Button, Modal} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            username: '',
            password: '',
            error: '',
        }

        this.handleUser = this.handleUser.bind(this);
        this.handlePass = this.handlePass.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleUser(event) {
        this.setState({username: event.target.value});
    }

    handlePass(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        this.setState({
            username: '',
            password: '',
            passwordConf: '',
        }); 
        this.props.submit(this.state); 
    }

    
    render() {
        return(
            <div className='container'>
                <Modal show={this.props.show}>
                    <Modal.Header>
                    <h3>Login</h3>
                    <Button className='justify-content-end btn-danger' onClick={this.props.close}>Close</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Username</h5>
                        <input label='username' onChange={this.handleUser} value={this.state.username}></input>
                
                        <h5>Password</h5>
                        <input type='password' label='password' onChange={this.handlePass} value={this.state.password} ></input>
                    </Modal.Body>

                    <Modal.Footer>
                        <h6 className='text-danger'>{this.props.error}</h6>
                        <Button onClick={this.handleSubmit}>Login</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}