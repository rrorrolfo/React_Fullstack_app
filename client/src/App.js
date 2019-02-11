import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { 
  BrowserRouter,
  Route,
  Redirect,
  Switch} from "react-router-dom";
import { Provider } from "./components/Context/index"

// App components
import Header from './components/Header';
import Courses from './components/courses/Courses';
import CourseDetails from "./components/courses/CourseDetails";
import UserSignIn from './components/userActions/UserSignIn';
import UserSignUp from './components/userActions/UserSignUp';
import UserSignOut from "./components/userActions/UserSignOut"
import CreateCourse from './components/userActions/CreateCourse';
import UpdateCourse from './components/userActions/UpdateCourse';
import NotFound from './components/NotFound';
import PrivateRoute from "./components/PrivateRoute";


class App extends Component {

// Global state which holds the logged user
  state = {
      loggedUser: null,
      isUserAuthenticated: false,
      loading: false
  }

  // Update loggedUser in state to the loggedin user
  saveLoggedUser = user => {
    this.setState({
      loggedUser: user
    })
  }

  // Toggle loading status method
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  componentDidUpdate() {

    // Authenticates the current loggedin user 
    if (this.state.loggedUser && this.state.isUserAuthenticated === false) {

      const requestOptions = {
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Basic ${this.state.loggedUser.authdata}`
        }
      };

      return axios.get("http://localhost:5000/api/users", requestOptions)
      .then( response => {
        if (response.status === 200) {
          this.setState({
            isUserAuthenticated: true
          })
        } else {
          console.log(response)
        }
      })
      .catch( error => console.log(error) )
    } else if (!this.state.loggedUser && this.state.isUserAuthenticated ===true) {
      this.setState({
        isUserAuthenticated: false
      })
    }
  }

  // Method that makes a get request to the REST API with Basic authentication headers in oder to retrieve an user if it exists and store it in local storage as "user"
  logIn = ( emailAddress, password) => {

    // Encrypt credentials
    const B64user = window.btoa( emailAddress + ':' + password)

    const requestOptions = {
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Basic ${B64user}`
        }
    };

    // Get request
    return axios.get("http://localhost:5000/api/users", requestOptions)
    .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = B64user;
                this.saveLoggedUser(user);
                console.log(user);
            }

            return user;
        })
    .catch( error => console.log(error) );
}

// Method that logsOut a loggedin user 
logOut = () => {
  this.setState({
    loggedUser: null
  })
}

  render() {
    return (
      <Provider value={ {
        user: this.state.loggedUser,
        isAuthenticated: this.state.isUserAuthenticated,
        isLoading: this.state.loading,
        actions: {
          logIn: this.logIn,
          saveLoggedUser: this.saveLoggedUser,
          toggleLoading: this.toggleLoading
        }
      } }>
        <BrowserRouter>
          <div>
          
            <Header />
            <Switch>
              
              <Route exact path="/" render={ () => <Courses /> }/>
              <PrivateRoute exact path="/courses/create" component={ CreateCourse }/>
              <Route exact path="/courses/:id" render={ () => <CourseDetails /> }/>
              <PrivateRoute path="/courses/:id/update" component={ UpdateCourse }/>
              <Route path="/signin" render={ () =>  this.state.loggedUser ? <Redirect to="/" /> : <UserSignIn />}/>
              <Route path="/signup" render={ () => this.state.loggedUser ? <Redirect to="/" /> : <UserSignUp /> }/>
              <Route path="/signout" render={ () => <UserSignOut logOut={this.logOut}/> }/>
              <Route path="/notfound" component={ NotFound }/>
              <Route render={ () => <Redirect to="/notfound"/> }/>
              
            </Switch>

          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
