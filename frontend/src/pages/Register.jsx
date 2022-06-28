import {useState, useEffect} from 'react'   
/* we'll (finally) be using react. We import useState since we'll be working w/ form fields, 
with each one having a component-level state */
import {FaUser} from 'react-icons/fa'

import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'  
// we import useNavigate as well for redirecting.
import {toast} from 'react-toastify' 
// remember when we installed this with npm i toastify :)

import {register, reset} from '../features/auth/authSlice'

import Spinner from '../components/Spinner'   // import Spinner component.

function Register() {
  const [formData, setFormData] = useState({  // should look familar. Here we're assigning default values to useState.
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData   // destructuring

  const navigate = useNavigate();   // more stuff added.
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  // useSelector is used to specify what part of the state we want this info from (auth, the only global state we have rn)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {  
      navigate('/')
      /* REMEMBER: in authSlice.js, if we look at the extra reducers, state.isSuccess = true when register.fulfilled is true. 
        so this will fire off if so. User is basically, if they logged in, that already includes the token and isSucess is 
        already true. Hope that makes sense. If success, user is navigated to the dashboard ('/') */

      dispatch(reset());  // dispatch reset (authSlice.js) which sets everything to false, for the next time user logs in.
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])
  // remember, useEffect in react has a dependeny array. If any of these items changes, useEffect executes. 


  const onChange = (e) => {
    setFormData((prevState) => ({       // we're setting the data to an object
      ...prevState,                     // spread the previous state to get all the fields
      [e.target.name]: e.target.value,  // set whatever name field it may be (e.g: email, name, password) to whatever is being typed
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match') // after imported toast, we can use it to throw errors
    } else {
      /* otherwise, we register the user. Remember that the register func (see authSlice.js) takes in the user data, 
      so we create userData */
      const userData = {      
        name, email, password
      } 

      dispatch(register(userData))    // we dispatch the register func with the user data.
    }
  }
  if (isLoading) {
    return <Spinner/>   // if loading, return Spinner comp.
  }

  return <>
    <section className='heading'>
      <h1>
        <FaUser /> Register      {/* FaUser is the cute little user icon imported from react-icons */}       
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        {/* created with .form--group. Putting this stuff in 'form-group' prettifies the text box. This will be copied 4 times below */}
        <div className="form-group">
          {/* created with input.form--control, and the id onward manually added. "value={name}" comes from destructuring*/}
          <input 
          type="text" 
          className="form-control" 
          id='name' 
          name='name' 
          value={name} 
          placeholder='Enter your name' 
          onChange={onChange}/>     
        </div>  

        {/* this one for the email */}
        <div className="form-group">
          <input 
          type="email" 
          className="form-control" 
          id='email' 
          name='email' 
          value={email} 
          placeholder='Enter your email' 
          onChange={onChange}/>     
        </div>

        {/* this one for password */}
        <div className="form-group">
          <input 
          type="password" 
          className="form-control" 
          id='password' 
          name='password' 
          value={password} 
          placeholder='Enter password' 
          onChange={onChange}/>     
        </div>     

        {/* this one for reentered password */}
        <div className="form-group">
          <input 
          type="password2" 
          className="form-control" 
          id='password2' 
          name='password2' 
          value={password2} 
          placeholder='Confirm password' 
          onChange={onChange}/>     
        </div>  
        
        {/* created with .form-group */}
        <div className="form-group">
          {/* created with button:submit */}
          <button type="submit" className='btn btn-block'>
            Submit
          </button>
        </div>

      </form>

    </section>


  </>
}

export default Register