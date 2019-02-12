import React from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../components/Context/index"

const Header = () => {
    return (
        <Consumer>

        { context => <div className="header">
                <div className="bounds">
                    <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                    <nav>
                        { context.user ? ( 
                        <React.Fragment>
                            <h5>{context.user.data.user}</h5>
                            <Link to="/signout" className="signup">Log Out</Link>
                        </React.Fragment>
                        ) : (
                        <React.Fragment> 
                            <Link to="/signup" className="signup">Sign Up</Link>
                            <Link to="/signin" className="signin">Sign In</Link>
                        </React.Fragment>
                        )
                        }
                    </nav>
                </div>
            </div>}
            
        </Consumer>
    )
}

export default Header;