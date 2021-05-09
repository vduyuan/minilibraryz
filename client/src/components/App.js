import React from 'react';
import {Button, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 

// import CollageForm from './CollageForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Profile from './Profile';
import HomePage from './HomePage';
import CollageForm from './CollageForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPressed: false,
      signupPressed: false,
      loggedIn: false,
      collagePressed: false,
      username: '',
      errorMsg: '',
      books: [],
    }

    this.handleLogin = this.handleLogin.bind(this); 
    this.handleSignup = this.handleSignup.bind(this); 
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this); 
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);

    this.handleClose = this.handleClose.bind(this);  
    this.handleBookSubmit = this.handleBookSubmit.bind(this); 
    this.handleCollage = this.handleCollage.bind(this);

  }

  async handleBookSubmit(book) {

      try {
        const res = await axios.post('/users/' + this.state.username + '/books', {
          cover: book.cover,
          title: book.title,
          author: book.author,
          description: book.description,
        });

        const newBook = {
          cover: book.cover,
          title: book.title,
          author: book.author,
          description: book.description,
        }

        if (res.data === "SUCCESS") {
          this.setState({books: this.state.books.concat(newBook), error: '', collagePressed: false});
        } else {
          this.setState({error: res.data});
        }
        

      } catch (error) {
        console.log(error); 
      }
  }

  handleClose() {
    this.setState({loginPressed: false, signupPressed: false, collagePressed: false});
  }

  handleLogin(event) {
    this.setState({loginPressed: true});
  }

  handleSignup(event) {
    this.setState({signupPressed: true});
  }

  handleCollage(event) {
    this.setState({collagePressed: true});
  }

  handleLoginSubmit = async (state) => {
        try {
          const res = await axios.post('/users/login', {
            username: state.username,
            password: state.password
          })

          if (res.data === "Success") {
              this.setState({loggedIn: true, loginPressed: false, error: '', username: state.username});

              const books = await axios.get('/users/' + this.state.username + "/books");
              this.setState({books: books.data});
              console.log(this.state.books); 
          } else {
            console.log(res.data); 
            this.setState({error: res.data})
          } 

        } catch (error) {
          console.log(error); 
        }
  }



  handleSignupSubmit = async (state) => {
        if (state.password !== state.passwordConf) {
            this.setState({error: "Passwords do not match"})
            return; 
        } else if (state.username.length < 3) {
            this.setState({error: "Username must be at least 3 characters long"})
            return;
        } else if (state.password.length < 3) {
            this.setState({error: "Password must be at least 3 characters long"})
            return;
        } else if (state.username.includes(' ')) {
            this.setState({error: "Username should not have spaces"})
            return; 
        } else {
            this.setState({error: ''})
        }

        try {
          const res = await axios.post('/users', {
            username: state.username,
            password: state.password
          })

          if (res.data === "CREATED USER") {
            this.setState({loggedIn: true, signupPressed: false, error: '', username: state.username, books: []});
          } else {
            this.setState({error: res.data});
          }
        } catch (error) {
          console.log(error.message); 
        }
        
  }

  
  render() {  
    const loginButtons = (
      <div>
        <Button onClick={this.handleLogin}>Login</Button>
        <Button onClick={this.handleSignup}>Sign Up</Button>
      </div>
    );

    return (
      <div className="App">
        <Navbar bg='light'> 
          <Navbar.Brand>miniLibraryz</Navbar.Brand>
          <div className='container justify-content-end'>
            {!this.state.loggedIn ? loginButtons : 
              <div>
              <Button onClick={() => this.setState({loggedIn: false, username: ''})}>Logout</Button>
              <Button onClick={this.handleCollage}>Add a Book!</Button>
              </div>
            }
          </div>
          
        </Navbar>
        <div>
              <LoginForm show={this.state.loginPressed} submit={this.handleLoginSubmit} close={this.handleClose} error={this.state.error} />
              <SignupForm show={this.state.signupPressed} submit={this.handleSignupSubmit} close={this.handleClose} error={this.state.error} />
              <CollageForm show={this.state.collagePressed} submit={this.handleBookSubmit} close={this.handleClose} error={this.state.error} />
        </div>

        {this.state.loggedIn ?
          <Profile user={this.state.username} books={this.state.books} /> : <HomePage />
          }
      </div>
    );
  }
} 

