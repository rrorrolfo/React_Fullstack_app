import React, {Component} from "react";
import {Redirect} from "react-router-dom";


// This component logs out the user
class UserSignOut extends Component {

    componentDidMount() {
        this.props.logOut();
    }

    // Redirects to "/" after logging out user
    render(){
        return(
            <Redirect to="/" />
        )
    }
}

export default UserSignOut;