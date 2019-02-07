import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter,
  Route} from "react-router-dom";

// App components
import Header from './components/Header';
import Courses from './components/courses/Courses';
import CourseDetails from "./components/courses/CourseDetails";
import UserSignIn from './components/userActions/UserSignIn';
import UserSignUp from './components/userActions/UserSignUp';
import UserSignOut from "./components/userActions/UserSignOut"
import CreateCourse from './components/userActions/CreateCourse';
import UpdateCourse from './components/userActions/UpdateCourse';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" render={ () => <Courses /> }/>
          <Route exact path="/courses/:id" render={ () => <CourseDetails /> }/>
          <Route exact path="/courses/create" render={ () => <CreateCourse /> }/>
          <Route exact path="/courses/:id/update" render={ () => <UpdateCourse /> }/>
          <Route path="/signin" render={ () => <UserSignIn /> }/>
          <Route path="/signup" render={ () => <UserSignUp /> }/>
          {/*<Route path="/signout" render={ () => <UserSignOut /> }/>*/}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
