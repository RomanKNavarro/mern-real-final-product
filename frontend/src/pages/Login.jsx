// copied over from register.jsx. It's not all that different after all
import {useState, useEffect} from 'react'   
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'  
import {toast} from 'react-toastify' 
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'   

function Login() {
  const [formData, setFormData] = useState({ 
    email: '',
    password: ''    // remove password2 and name
  })

  const {email, password} = formData   // we only need email and pw to login

  const navigate = useNavigate();   
  const dispatch = useDispatch();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)   // paste from register

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {  
      navigate('/')
      dispatch(reset());  
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])     // paste from register

  const onChange = (e) => {
    setFormData((prevState) => ({      
      ...prevState,                    
      [e.target.name]: e.target.value, 
    }))
  }

  const onSubmit = (e) => {       // onSubmit is slightly different from register.jsx
    e.preventDefault();

    const userData = {
      email,              // we don't include 'name'
      password
    }

    dispatch(login(userData))   // almost identical from register: dispatch(register(userData))
  }
  // pretty much the same from reigster, except it's not creating the user -its validating it in the backend

  if (isLoading) {
    return <Spinner/>
  }

  return <>
    <section className='heading'>
      <h1>
        {/* changes here */}
        <FaSignInAlt /> Login                          
      </h1>
      <p>Login and start setting goals</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>

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

        <div className="form-group">
          <button type="submit" className='btn btn-block'>
            Submit
          </button>
        </div>

      </form>

    </section>


  </>
}

export default Login