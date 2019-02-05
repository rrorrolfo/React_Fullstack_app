import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter,
  Route} from "react-router-dom";
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
          <Route path="/courses/create" render={ () => <CreateCourse /> }/>
          <Route path="/courses/:id/update" render={ () => <UpdateCourse /> }/>
          <Route path="/courses/:id" render={ () => <CourseDetails /> }/>
          <Route path="/signin" render={ () => <UserSignIn /> }/>
          <Route path="/signup" render={ () => <UserSignUp /> }/>
          {/*<Route path="/signout" render={ () => <UserSignOut /> }/>*/}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
