import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserSignIn extends Component {

    state = {

    }

    render() {
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                        <div>
                            <form>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address"/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password"/>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign In</button>
                                    <Link to="/">
                                        <button className="button button-secondary" onClick={this.preventDefault} >Cancel</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }

}

export default UserSignIn;