import React from "react";
import { 
    Route,
    Redirect} from "react-router-dom";
import { Consumer } from "./Context/index";

// This Higher order component (HOC) prevents an unauthenticated user to access routes that require authentication and redirects them to the login component

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
        { context => (
            <Route {...rest} render={props =>

                context.isAuthenticated ? (
                        <Component {...props} />
                        ) : (
                        <Redirect to={{pathname: "/signin", state: { from: props.location}}}/>
                    )
                }
            />
        )}

    </Consumer>
  );

export default PrivateRoute;