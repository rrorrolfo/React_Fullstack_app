import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";
import { Consumer } from "../Context/index"


class UpdateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded:"",
        courseID:"",
        user: null
    }

    // Handles change in an input, updates state to the value of the correspondant input
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    componentDidMount() {

        const courseToDisplay = this.props.match.params.id;

         // Fetches course details from DB
         axios.get(`http://localhost:5000/api/courses/${courseToDisplay}`)
         .then(response => {
             this.setState( {
                                title: response.data.title,
                                description: response.data.description,
                                estimatedTime: response.data.estimatedTime,
                                materialsNeeded: response.data.materialsNeeded,
                                user: response.data.user,
                                courseID: response.data._id
                            })
                        })
         .catch(error => console.log("Error fetching and parsing data", error));
    }

    handleSubmit = (userToAuthenticate, callback) => {
        // If user passes REST API authentication the course will be created
        
        // Creates Headers to authenticate user and send it together with the request
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Basic ${userToAuthenticate}`
            }
        };

        // Post request to create the course
        axios.put(`http://localhost:5000/api/courses/${this.state.courseID}`, {
            title: this.state.title,
            description:this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded:this.state.materialsNeeded,
            user: this.state.user._id
        },
        requestOptions)
        .then( response => {console.log(response); callback(); this.props.history.push("/") })
        .catch(error => console.log("Error fetching and parsing data", error));

    }

    render() {

        const courseDetails = this.state;
        const user = this.state.user;

        return (
            <Consumer >

                { context => (
                    <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form onSubmit={event => {event.preventDefault(); context.actions.toggleLoading(); this.handleSubmit(context.user.authdata, context.actions.toggleLoading); }}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={ this.handleChange } value={ courseDetails.title }/>
                            </div>
                                <p>By {user ? (`${user.firstName} ${user.lastName}`) : ("")}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description..." value={ courseDetails.description } onChange={ this.handleChange }>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                            placeholder="Hours" value={courseDetails.estimatedTime ? (courseDetails.estimatedTime) : ("")} onChange={ this.handleChange }/>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={courseDetails.materialsNeeded ? (courseDetails.materialsNeeded) : ("")} onChange={ this.handleChange }>
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            
                            <button className="button" type="submit">Update Course</button>
                            
                            <Link to="/">
                                <button className="button button-secondary" >Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
                )}

            </Consumer>
        )
    }

}

export default withRouter(UpdateCourse);