import React from 'react';
import {Modal, Button} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '',
            passwordConf: '', 
        }

        this.handleUser = this.handleUser.bind(this);
        this.handlePass = this.handlePass.bind(this); 
        this.handlePassConf = this.handlePassConf.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleUser(event) {
        this.setState({username: event.target.value});
    }

    handlePass(event) {
        this.setState({password: event.target.value});
    }

    handlePassConf(event) {
        this.setState({passwordConf: event.target.value});
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
                    <h3>Signup</h3>
                    <Button className='justify-content-end btn-danger' onClick={this.props.close}>Close</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Username</h5>
                        <input label='username' onChange={this.handleUser} value={this.state.username}></input>
                
                        <h5>Password</h5>
                        <input type='password' label='password' onChange={this.handlePass} value={this.state.password} ></input>

                        <h5>Confirm Password</h5>
                        <input type='password' label='passwordConf' onChange={this.handlePassConf} value={this.state.passwordConf} ></input>
                    </Modal.Body>

                    <Modal.Footer>
                        <h6 className='text-danger'>{this.props.error}</h6>
                        <Button onClick={this.handleSubmit}>Signup</Button>
                    </Modal.Footer>
                </Modal>
            </div>)
    }
}