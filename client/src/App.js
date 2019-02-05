import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Courses from './components/courses/Courses';
import CourseDetails from "./components/courses/CourseDetails";
import SignIn from './components/userActions/UserSignIn';
import UserSignUp from './components/userActions/UserSignUp';
import CreateCourse from './components/userActions/CreateCourse';
import UpdateCourse from './components/userActions/UpdateCourse';


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Courses />
        <CourseDetails />
        <SignIn />
        <UserSignUp />
        <CreateCourse />
        <UpdateCourse />
      </div>
    );
  }
}

export default App;
