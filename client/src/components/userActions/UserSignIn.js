import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Consumer } from "../Context/index";
import ErrorElement from "../UIElements/ErrorElement";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

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

        const { from } = this.props.location.state || { from: { pathname: '/'}};

        if(cookies.get("userCookie")){
            return (
                <Redirect to={from} />
            )
        }
        
        return(
        <Consumer>
            { context => (

                <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>

                        {/* Redirects to /error in case of a 500 error or displays error messages in case they are present (401 error)*/}
                        {context.errors[0] === 500 ? (<Redirect to={"/error"} />) : (
                        context.errors.length !== 0 ? (
                                <div>
                                    <div className="validation-errors">
                                    <ul>
                                        <ErrorElement errorMessage={context.errors[0]} />
                                    </ul>
                                    </div>
                                </div>
                            ) : ("") )}

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

export default withRouter(UserSignIn);