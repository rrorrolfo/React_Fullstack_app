import React, { Component } from "react";
import axios from "axios";

// This component renders the details of a selected course
// Need to transform required materials to a list

class CourseDetails extends Component {

    state = {
        course: ""
    }

    componentDidMount() {
         // Fetches course details from DB
         axios.get('http://localhost:5000/api/courses/57029ed4795118be119cc440')
         .then(response => {
             this.setState( {course: response.data} )
             console.log(response.data)})
         .catch(error => console.log("Error fetching and parsing data"));
    }

    render() {

    const fetchedCourse = this.state.course;

    return(
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{ fetchedCourse.title }</h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <p>{ fetchedCourse.description }</p>
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
                    <li>1/2 x 3/4 inch parting strip</li>
                    <li>1 x 2 common pine</li>
                    <li>1 x 4 common pine</li>
                    <li>1 x 10 common pine</li>
                    <li>1/4 inch thick lauan plywood</li>
                    <li>Finishing Nails</li>
                    <li>Sandpaper</li>
                    <li>Wood Glue</li>
                    <li>Wood Filler</li>
                    <li>Minwax Oil Based Polyurethane</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
    )
}

}

export default CourseDetails;