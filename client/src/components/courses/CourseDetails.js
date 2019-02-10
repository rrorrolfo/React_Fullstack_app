import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Consumer } from "../Context/index"
const ReactMarkdown = require('react-markdown');

// This component renders the details of Link selected course
// Need to transform required materials to Link list

class CourseDetails extends Component {

  state = {
    course: "",
    courseOwner: null,
    isCourseOwner: false
  };

  componentDidMount() {

    // Makes get request to get the selected course
      const courseToDisplay = this.props.match.params.id;

        // Fetches course details from DB
        axios.get(`http://localhost:5000/api/courses/${courseToDisplay}`)
        .then(response => {
            this.setState( {course: response.data, courseOwner: response.data.user} )
            console.log(this.state.course)})
        .catch(error => console.log("Error fetching and parsing data", error));

  }

  // Deletes currently displayed course
  deleteCourse = userToAuthenticate => {

    // Creates Headers to authenticate user and send it together with the request
    const requestOptions = {
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Basic ${userToAuthenticate}`
        }
    };

    // Delete request to delete current course
    axios.delete(`http://localhost:5000/api/courses/${this.state.course._id}`, requestOptions)
    .then(response => console.log(response))
    .catch(error => console.log("Error fetching and parsing data", error));

}

  render() {

  const fetchedCourse = this.state.course;

  return(
    <Consumer>

      { context => (
        <div className="bounds course--detail">

        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">

              {/* Displays Update and Delete buttons only if user is authenticated and its userID matches the _id of the user that created the course*/}
              {
                this.state.courseOwner ? (
                  context.isAuthenticated && this.state.courseOwner._id === context.user.data.userID ?  (
                    <span>
                      <Link className="button" to={`/courses/${fetchedCourse._id}/update`}>Update Course</Link>
                      <Link className="button" to="/" onClick={this.deleteCourse(context.user.authdata)}>Delete Course</Link>
                    </span>
                ) : ( console.log("User is not owner of the course"))
                ) : ( console.log("User is not owner of the course"))
                
              }
              
              <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
          </div>
        </div>

        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{ fetchedCourse.title }</h3>
            <p>By { this.state.courseOwner ? (`${this.state.courseOwner.firstName} ${this.state.courseOwner.lastName}`) : ("") }</p>
          </div>
          <div className="course--description">
            <ReactMarkdown source={ fetchedCourse.description }/>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{ fetchedCourse.estimatedTime }</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  <ReactMarkdown source={fetchedCourse.materialsNeeded}/>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      )}
      
    </Consumer>
  )
}

}

export default withRouter(CourseDetails);