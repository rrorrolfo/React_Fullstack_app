import React, { Component } from "react";
import { Link } from "react-router-dom";
import authenticationMethods from "../authentication/authMethods"

class UserSignIn extends Component {

    state = {
        emailAddress: "",
        password: "",
        loading: false
    }

    // Handles change in an input, updates state to the value of the correspondant input
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = ( event ) => {
        event.preventDefault();
        // Sends credentials to server to be able to login
        authenticationMethods.login(this.state.emailAddress, this.state.password)

    }

    render() {
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                        <div>
                            <form onSubmit={ this.handleSubmit }>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={ this.handleChange }/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={ this.handleChange }/>
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