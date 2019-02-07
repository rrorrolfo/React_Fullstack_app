import React from "react";
import { Link } from "react-router-dom";

// This component displays Link single course title in the root route

const SingleCourse = ({ title, courseID }) => {
    return(
            <div className="grid-33">
                <Link className="course--module course--link" to={`courses/${courseID}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{ title }</h3>
                </Link>
            </div>
    )
}

export default SingleCourse;