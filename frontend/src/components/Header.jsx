import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
// react-icons itself contains multiple libraries. In this case, we're using fa (Font Awsome)

import {Link, useNavigate} from 'react-router-dom'   
// The useNavigate hook returns a func that lets you navigate programmatically, for example after a form is submitted.
/* Link is to have links to our pages. 
Remember, this was installed in frontend via: 
cd frontend
npm i react-router-dom
even then, there's no folder created in 'frontend'. Interesting.
*/

import {useSelector, useDispatch} from 'react-redux'   
// we import this for the logout icon since we will need to access the state to get the user
import {logout, reset} from '../features/auth/authSlice'
// we import these two funcs as well. reset is needed because upon logout, we reset the state 

function Header() {                       {/* this header is a nav bar at the top from where you can go to different pages */}
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)      
  // we wanna get user from the state, just like how we got register (see register.jsx). 

  const onLogout = () => {
    dispatch(logout())        // remember: the useDispatch hook returns a reference to the dispatch func from the Redux store.
    dispatch(reset())
    navigate('/')     // after logging out and resetting, navigate back to the dashboard.
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>    {/* remember that '/' links to the Dashboard */}
      </div>
      <ul>
        {user ? (                     // if user....       
        <li>    
          <button className='btn' onClick={onLogout}>     {/* then show a logout button */}
            <FaSignOutAlt /> Logout 
          </button>
        </li>
        ) : (
        <>
        <li>                                              {/* else...show login and register links */}    
          <Link to='/login'>        {/* within this unordered list are two list elems, one for login and the other for register */}
            <FaSignInAlt /> Login   {/* when these Link elems are clicked, they take us to their respective page. Awsome*/}
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Register     {/* This is interesting syntax I've never seen before */}
          </Link>
        </li>
        </>)}

      </ul>
    </header>
    
  )
}

export default Header