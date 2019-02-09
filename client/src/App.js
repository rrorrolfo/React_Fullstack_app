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


class App extends Component {

  state = {
      loggedUser: null
  }

  // Update loggedUser in state to the loggedin user
  saveLoggedUser = user => {
    this.setState({
      loggedUser: user
    })
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

logOut = () => {
  this.setState({
    user: null
  })
}

  render() {
    return (
      <Provider value={ {
        user: this.state.loggedUser,
        actions: {
          logIn: this.logIn,
          logOut: this.logOut,
          saveLoggedUser: this.saveLoggedUser
        }
      } }>
        <BrowserRouter>
          <div>
          
            <Header />
            <Switch>
              
              <Route exact path="/" render={ () => <Courses /> }/>
              <Route exact path="/courses/create" render={ () => <CreateCourse /> }/>
              <Route exact path="/courses/:id" render={ () => <CourseDetails /> }/>
              <Route path="/courses/:id/update" render={ () => <UpdateCourse /> }/>
              <Route path="/signin" render={ () =>  this.state.loggedUser ? <Redirect to="/" /> : <UserSignIn />}/>
              <Route path="/signup" render={ () => <UserSignUp /> }/>
{/* Need to polish this route */}
              <Route path="/signout" render={ () => this.state.loggedUser ? <UserSignOut /> : <Redirect to="/" />}/>
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
