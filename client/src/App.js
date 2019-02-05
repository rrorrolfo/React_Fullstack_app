import React, { Component } from 'react';
import './App.css';
import Courses from './components/courses/Courses';
import CourseDetails from "./components/courses/CourseDetails";

class App extends Component {

  render() {
    return (
      <div>
        <Courses />
        <CourseDetails />
      </div>
    );
  }
}

export default App;
