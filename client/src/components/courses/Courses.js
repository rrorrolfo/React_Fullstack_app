import React, { Component } from "react";
import SingleCourse from "./SingleCourse";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

// Root route which displays all the available courses

class Courses extends Component {

    state = {
        courses: [],
        errors: []
    }

    fetchCourses = () => {
       
        // Fetches course titles from DB and updates courses state
         axios.get('http://localhost:5000/api/courses')
        .then(response => {
            const data = response.data;
            const coursestitle = [];
            data.forEach( course => coursestitle.push({ title: course.title, id: course._id }));
            return this.setState({courses: coursestitle});
        })
        .catch(error => { if( error.response.status === 404) {
            this.props.history.push("/notfound");
        } else {
            this.props.history.push("/error");
            }
          } );
    }

    // Gets the collection of all courses in DB
    componentDidMount() {
        this.fetchCourses();
    }

    //displays all the existing courses
    displayCourses () {

        const courses = this.state.courses
        const coursesToDisplay = courses.map( course => <SingleCourse title={course.title} courseID={course.id} key={course.id}/>);

        return coursesToDisplay;
    }

    render () {
        return(

            <div className="bounds">
                { this.displayCourses()}
                <div className="grid-33">
                    <Link to="/courses/create" className="course--module course--add--module">
                        <h3 className="course--add--title"> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>New Course</h3>
                    </Link>
                </div>
            </div>

        )
    }

}

export default withRouter(Courses);