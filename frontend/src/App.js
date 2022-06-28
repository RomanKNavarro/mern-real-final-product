// here's the "main" file, where all our pages are laid out 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'    
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'      // this stuff imported to get toast to show up in our pages. 

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        {/* REMEMBER THAT THE CODE AFTER THE "RETURN" IS JSX, HERE'S HOW TO COMMENT IN JSX.
        Here's how we set up our routes for each of the pages. We are SETTING the paths, which 
        we'll use in the browser to determine which page to show. Example: http://localhost:3000/login
        Fascinating.*/}
        <Header />  
        {/* Put our header above the routes. Nothing goes in Routes unless its a Route tag. */}
        <Routes>      
          <Route path='/' element={<Dashboard/>} />       
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
    <ToastContainer />    
    {/* put toastContainer here. */}
    </>

  );
}

export default App;
