import React, { Component } from "react";
import SingleCourse from "./SingleCourse";
import axios from "axios";

class Courses extends Component {

    state = {
        courses: []
    }

    componentDidMount() {
        // Fetches course titles from DB
        axios.get('http://localhost:5000/api/courses')
        .then(response => {
            const data = response.data;
            const coursestitle = [];
            data.forEach( course => coursestitle.push({ title: course.title, id: course._id }));
            return this.setState({courses: coursestitle});
        })
        .catch(error => console.log("Error fetching and parsing data"));
    }

    displayCourses () {
        const courses = this.state.courses
        const coursesToDisplay = courses.map( course => <SingleCourse title={course.title} key={course.id}/>);

        return coursesToDisplay;
    }

    render () {
        return(
            <div>
                {this.displayCourses()}
            </div>
        )
    }
}

export default Courses;