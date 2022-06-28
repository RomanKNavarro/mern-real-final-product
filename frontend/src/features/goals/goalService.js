// // COPIED THIS SHIT OVA
import axios from 'axios' 

// BRAD'S SHIT (SAME)
//import axios from 'axios'

const API_URL = '/api/goals/'

// BRAD'S SHIT (SAME AS MINE):
// const API_URL = '/api/goals/'

// create new goal
const createGoal = async (goalData, id) => {
  const config = {
    headers: {
      /* this is going to be our id,  which we want to send as a bearer id.  See authMiddelware.js 
      in the backend for useful info on bearer ids  */
      Authorization: `Bearer ${id} `,    
    }
  }

  const response = await axios.post(API_URL, goalData, config)    
  /* the response is quite different from auth:
  const response = await axios.post(API_URL, userData) 
  We send the config, which has the id. Without that, we won't be able to access the route.  
  */

  return response.data;
}

// get user goals
// const getGoals = async (token) => {      
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,       
//     }
//   }
//   const response = await axios.get(API_URL, config)      
//   return response.data
// }

// BRAD'S GETGOALS (SAME AS MY SHIT)
// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// delete goal
const deleteGoal = async (goalId, token) => {      // REMEMBER: in goalSlice, the func takes 'id' as an arg.  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,    
    },
  }

  const response = await axios.delete(API_URL + goalId, config)   // make delete request to API_URL on our goal id      
  return response.data
}

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
}

export default goalService
