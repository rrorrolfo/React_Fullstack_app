import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <Link to="/signup" className="signup">Sign Up</Link>
                    <Link to="/signin" className="signin">Sign In</Link>
                </nav>
            </div>
        </div>
    )
}

export default Header;