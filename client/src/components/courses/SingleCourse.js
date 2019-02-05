import React from "react";

// This component displays a single course title in the root route

const SingleCourse = ({ title, courseID }) => {
    return(
        <div className="bounds">
            <div className="grid-33">
                <a className="course--module course--link" href={`http://localhost:5000/api/courses/` + courseID}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{ title }</h3>
                </a>
            </div>
        </div>
    )
}

export default SingleCourse;