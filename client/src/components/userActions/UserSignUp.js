import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../Context/index";
import axios from "axios";

class UserSignUp extends Component {

    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        signUpUser: null
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
                .then(response => console.log(response))
                .catch( error => console.log(error.message))
          
        } else {
            const error = new Error("Passwords do not match");
            console.error(error);
        }
        
    }

    /*this.setState({
        signUpUser: {
            data: {
                user: `${this.state.firstName} ${this.state.lastName}`
            },
            authdata: window.btoa( this.state.emailAddress + ':' + this.state.password)
        }
    },*/

    render() {
        
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                    <div>
                        <form onSubmit={ this.handleSubmit }>
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
        )
        
    }
    
}

export default UserSignUp;