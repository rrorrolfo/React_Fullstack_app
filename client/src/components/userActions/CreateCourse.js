import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Consumer } from "../Context/index";

class CreateCourse extends Component {
    
    // Input references
    titleRef = React.createRef();
    descriptionRef = React.createRef();
    estimatedTimeRef = React.createRef();
    materialsNeededRef = React.createRef();

    handleSubmit = userToAuthenticate => {
        // If user passes REST API authentication the course will be created
        
        // Creates Headers to authenticate user and send it together with the request
        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Basic ${userToAuthenticate}`
            }
        };

        // Posr request to create the course
        axios.post("http://localhost:5000/api/courses", {
            title: this.titleRef.current.value,
            description:this.descriptionRef.current.value,
            estimatedTime: this.estimatedTimeRef.current.value,
            materialsNeeded:this.materialsNeededRef.current.value
        },
        requestOptions)
        .then( response => console.log(response))
        .catch(error => console.log("Error fetching and parsing data", error));

    }

    render() {
        return(
            <Consumer>
                { context => (
                    <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                            </div>
                        </div>
                        <form onSubmit={event => {event.preventDefault(); this.handleSubmit(context.user.authdata)} }>
                            <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={ this.titleRef }/>
                                </div>
                                <p>By Joe Smith</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" placeholder="Course description..." ref={ this.descriptionRef }></textarea>
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
                                        placeholder="Hours" ref={ this.estimatedTimeRef }/>
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." ref={ this.materialsNeededRef }></textarea>
                                    </div>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Create Course</button>
                                <Link to="/">
                                <button className="button button-secondary">Cancel</button>
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

export default CreateCourse;