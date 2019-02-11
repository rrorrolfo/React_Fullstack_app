import React, { Component } from "react";
import ErrorElement from "../UIElements/ErrorElement"
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Consumer } from "../Context/index";
import axios from "axios";

// This class component render a form to sign up to the App

class UserSignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        errors: []
    }

    // Handles change in an input, updates state to the value of the correspondant input
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.password === this.state.confirmPassword) {

            axios.post("http://localhost:5000/api/users", {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.emailAddress,
                password: this.state.password
                })
                .then( response => { if ( response.status === 201) {this.props.history.push("/")} })
                .catch(error => { console.error(error); this.setState({ errors: error.response.data.errors })});                
          
        } else {
            const error = new Error("Passwords do not match");
            this.setState({
                errors: [error.message]
            })
        }
        
    }

    createUser = () => {

        const user = {
            data: {
                user: `${this.state.firstName} ${this.state.lastName}`,
                userID: ""
            },
            authdata: window.btoa( this.state.emailAddress + ':' + this.state.password)
        }

        return(user)
    }

    // Function tha renders errors if  present

    renderErrors = () => { 
        const errorsToDisplay = [];
        for (let i = 0; i < this.state.errors.length; i += 1) {
                            
            errorsToDisplay.push(<ErrorElement errorMessage={this.state.errors[i]} key={i + 1} />)
            }
            
            return errorsToDisplay
        }

    render() {

        return(

            <Consumer>
                { context => (
                    <div className="bounds">
                    <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                        <div>

                            {/* Displays error messages in case they are present*/}
                            {this.state.errors.length !== 0 ? (
                                <div>
                                    <h2 className="validation--errors--label">Validation errors</h2>
                                    <div className="validation-errors">
                                    <ul>
                                        { this.renderErrors() }
                                    </ul>
                                    </div>
                                </div>
                            ) : ("") }

                            <form onSubmit={ event => {this.handleSubmit(event); /*context.actions.saveLoggedUser(this.createUser())*/} }>
                                <div>
                                    <input id="firstName" name="firstName" type="text" placeholder="First Name" value={this.state.firstName} onChange={ this.handleChange }/>
                                </div>
                                <div>
                                    <input id="lastName" name="lastName" type="text" placeholder="Last Name" value={this.state.lastName} onChange={ this.handleChange }/>
                                </div>
                                <div>
                                    <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" value={this.state.emailAddress} onChange={ this.handleChange }/>
                                </div>
                                <div>
                                    <input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={ this.handleChange }/>
                                </div>
                                <div>
                                    <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={ this.handleChange }/>
                                </div>

                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign Up</button>
                                    <Link to="/">
                                        <button className="button button-secondary" onClick={ this.preventDefault }>Cancel</button>
                                    </Link>
                                </div>

                            </form>

                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
                    </div>
                </div>
                )}
                
            </Consumer>
        )
        
    }
    
}

export default withRouter(UserSignUp);