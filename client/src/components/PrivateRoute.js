import React from "react";
import { 
    Route,
    Redirect} from "react-router-dom";
import { Consumer } from "./Context/index";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
        { context => (
            <Route {...rest} render={props =>

                context.isAuthenticated ? (
                        <Component {...props} />
                        ) : (
                        <Redirect to={"/signin"}/> /*{{ pathname: "/login",state: { from: props.location } }}/> */
                    )
                }
            />
        )}

    </Consumer>
  );

export default PrivateRoute;