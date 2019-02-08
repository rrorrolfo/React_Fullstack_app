import axios from "axios";

//Helper methods for the authentication of a user

const authenticationMethods = {

    // Function that makes a get request to the REST API with Basic authentication headers in oder to retrieve an user if it exists and store it in local storage as "user"
    login: ( emailAddress, password) => {

        // Encrypt credentials
        const B64user = window.btoa( emailAddress + ':' + password)

        const requestOptions = {
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": `Basic ${B64user}`
            }
        };
    
        // Get request
        return axios.get("http://localhost:5000/api/users", requestOptions)
            .then(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    user.authdata = B64user;
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(user);
                }
    
                return user;
            });
    }
}

export default authenticationMethods;