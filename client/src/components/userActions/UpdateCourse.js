import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";


class UpdateCourse extends Component {

    state = {
        courseToUpdate: ""
    }

    componentDidMount() {

        const courseToDisplay = this.props.match.params.id;

         // Fetches course details from DB
         axios.get(`http://localhost:5000/api/courses/${courseToDisplay}`)
         .then(response => {
             this.setState( {courseToUpdate: response.data} )
             console.log(this.state.courseToUpdate)})
         .catch(error => console.log("Error fetching and parsing data", error));
    }

    render() {
        const fetchedCourse = this.state.courseToUpdate;
        const user = fetchedCourse.user; 
        console.log(user);
        

        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                            <div>
                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                value=""/>
                            </div>
                                <p>By {`${user}`}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea id="description" name="description" className="" placeholder="Course description...">
                                    {/*//description*/}
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
                                            placeholder="Hours" value="14 hours"/>
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials...">* 1/2 x 3/4 inch parting strip
                                            * 1 x 2 common pine
                                            * 1 x 4 common pine
                                            * 1 x 10 common pine
                                            * 1/4 inch thick lauan plywood
                                            * Finishing Nails
                                            * Sandpaper
                                            * Wood Glue
                                            * Wood Filler
                                            * Minwax Oil Based Polyurethane
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Update Course</button>
                            <Link to="/">
                                <button className="button button-secondary" onClick={this.preventDefault}>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default withRouter(UpdateCourse);