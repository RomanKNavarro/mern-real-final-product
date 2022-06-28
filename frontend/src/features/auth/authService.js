/* OPTIONAL FILE: a service file for the actual http request. It's nice to break it up and have a service that 
does all the http stuff */

import axios from 'axios' 
// just as we made our request with postman, now we'll use axios from within our application

const API_URL = 'api/users/'

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)            
  /* get response from the server, then send user data. IOW: this will make the request then put the 
  response into that variable. */

  if (response.data) {    // when we use axios it puts the data in an obj called 'data'.
    localStorage.setItem('user', JSON.stringify(response.data))
    /* in our localStorage we set a new item 'user' with corresponding value (response.data)
    which will include our token*/
  }
  return response.data;
}

// Login user
const login = async (userData) => {         // copied from register func.
  const response = await axios.post(API_URL + 'login', userData)    // the url will be: 'api/users/login'

  if (response.data) {  
    localStorage.setItem('user', JSON.stringify(response.data))   // just like w/ register, we save the user data.
  }
  return response.data;
}

// logout user
const logout = () => {
  localStorage.removeItem('user')   
  /* remove user on logout from localStorage. Simple way of doing this. A better way to do this is with an http cookie, 
  but that's beyond the scope of this video */
}

const authService = {
  register,              // any funcs we wanna export go in here
  logout,                 // FIGURED OUT WHY I COULDN'T LOGOUT; FORGOT TO HAVE 'LOGOUT' EXPORTED
  login
}

export default authService