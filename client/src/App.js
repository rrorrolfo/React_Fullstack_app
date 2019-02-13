import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { 
  BrowserRouter,
  Route,
  Redirect,
  Switch} from "react-router-dom";
import { Provider } from "./components/Context/index";
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

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
import ErrorRoute from "./components/ErrorRoute";
import Forbidden from "./components/Forbidden";
import PrivateRoute from "./components/PrivateRoute";
const cookies = new Cookies();


class App extends Component {

// Global state which holds the logged user, the authentication status, and errors generated while loggin in
  state = {
      loggedUser: null,
      isUserAuthenticated: false,
      errors: []
  }


  componentDidMount() {

    // checks if a user is stored already in cookies (logged in already)
    if (this.props.cookies) {
      const loggedInUser = cookies.get("userCookie");
      this.setState({
        loggedUser: loggedInUser
      });
    }

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
                // to keep user logged in between page refreshes
                user.authdata = B64user;
                // Stores obtaint user´s data (including authdata) in cookie called "usercookie"
                this.props.cookies.set("userCookie", user, {path: "/"})
                // Update loggedUser in state to the loggedin user
                this.setState({
                  loggedUser: user
                });
            }

            return user;
        })
    .catch( error =>  {if( error.response.status === 401) {
      this.setState({
        errors: ["Email address or password incorrect"]
      })} else {
        this.setState({
          errors: [500]
        })
      }
    } 
  );

}

// Method that logOut a loggedin user
logOut = () => {
  cookies.remove("userCookie");
  this.setState({
    loggedUser: null
  })
}

  render() {

    return (
      <Provider value={ {
        user: this.state.loggedUser,
        isAuthenticated: this.state.isUserAuthenticated,
        errors: this.state.errors,
        actions: {
          logIn: this.logIn
        }
      } }>
        <CookiesProvider>
          <BrowserRouter>
            <div>
              <Header />

              <Switch>
                <Route exact path="/" component={ Courses }/>
                <PrivateRoute exact path="/courses/create" component={ CreateCourse }/>
                <Route exact path="/courses/:id" component={ CourseDetails }/>
                <PrivateRoute path="/courses/:id/update" component={ UpdateCourse }/>
                <Route path="/signin" component={ UserSignIn}/>
                <Route path="/signup" render={ () => this.state.loggedUser ? <Redirect to="/" /> : <UserSignUp logIn={this.logIn}/> }/>
                <Route path="/signout" render={ () => <UserSignOut logOut={this.logOut}/> }/>
                <Route path="/forbidden" component={ Forbidden } />
                <Route path="/error" component={ ErrorRoute } />
                <Route path="/notfound" component={ NotFound }/>
                <Route render={ () => <Redirect to="/notfound"/> }/>
              </Switch>
            </div>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
  }

}

export default withCookies(App);
