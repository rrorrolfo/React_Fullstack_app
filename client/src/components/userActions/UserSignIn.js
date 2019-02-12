import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../Context/index";

class UserSignIn extends Component {

    state = {
        emailAddress: "",
        password: ""
    }

    // Handles change in an input, updates state to the value of the correspondant input
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return(
        <Consumer>
            { context => (

                <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                        <div>
                            <form onSubmit={ event => {event.preventDefault(); context.actions.logIn(this.state.emailAddress, this.state.password);} }>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value={this.state.emailAddress} onChange={ this.handleChange }/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" className="" placeholder="Password" value={this.state.password} onChange={ this.handleChange }/>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign In</button>
                                    <Link to="/">
                                        <button className="button button-secondary">Cancel</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
            )}
        </Consumer>
            
        )
    }

}

export default UserSignIn;