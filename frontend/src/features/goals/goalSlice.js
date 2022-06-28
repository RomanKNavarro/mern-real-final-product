// PASTED THIS SHIT OVER

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'    
import goalService from './goalService' 

const initialState = {
  goals: [],  
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// create new goal
// REMEMBER: these things are called components (ALSO THUNK FUNCS) vv
export const createGoal = createAsyncThunk(
  'goals/create', 
  async (goalData, thunkAPI) => {
  try {   
    //const token = thunkAPI.getState().auth.goals.token
    const token = thunkAPI.getState().auth.user.token
    return await goalService.createGoal(goalData, token);      
    /* we wanna pass in our token from localStorage too. Note, however, that the token is in the "auth" part of the 
    state. Thanks to "thunkAPI", however, we can access info from ANY part of the state. Pretty sweet */ 
     
  } catch (error) {
    const message = 
    (error.response && 
      error.response.data && 
      error.response.data.message) || 
      error.message || 
      error.toString() 
    return thunkAPI.rejectWithValue(message)
   
  }
})


// QUITE POSSIBLE BUGGER HERE vvv
// get goals
export const getGoals = createAsyncThunk(
  'goals/getAll', 
  async (_, thunkAPI) => {
  // when we don't want to pass an arg, we pass _ ^^
    try {   
      // FOUND IT vvv. I put 'auth.goals.token' instead of 'auth.user.token'
      const token = thunkAPI.getState().auth.user.token
      // we need the token here too since this is protected & we need to know the the current user.
      return await goalService.getGoals(token)
    } catch (error) {                         
      const message = 
        (error.response && 
          error.response.data && 
          error.response.data.message) || 
        error.message || 
        error.toString() 
      return thunkAPI.rejectWithValue(message)
    }
  }
    // the same try/catch as createGoal
)

// BRAD'S GETGOALS (SAME AS MY SHIT):
// export const getGoals = createAsyncThunk(
//   'goals/getAll',
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await goalService.getGoals(token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// DELETE GOAL
export const deleteGoal = createAsyncThunk(
  'goal/delete',      
  async (id, thunkAPI) => {     // we pass the id instead of goalData
  try {   
    const token = thunkAPI.getState().auth.user.token
    return await goalService.deleteGoal(id, token);     // id here too. Everything else is the same as createGoal 
  } catch (error) {
    const message = 
    (error.response && 
      error.response.data && 
      error.response.data.message) || 
      error.message || 
      error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState, 
  reducers: {         
    // reset: (state) => {          change this....
    //   state.isLoading = false
    //   state.isError = false
    //   state.isSuccess = false
    //   state.isLoading = false
    // }                
    reset: (state) => initialState,  // I don't understand why he didn't use this in authSlice as well.
    /* ANSWER: because the goals persists. In authSlice.js, reset changes everything but goals. The goals and 
    the state need to persist; we dont want that to reset. */
  },
  // extraReducers: (builder) => {               // REMEMBER: extraRed. is a func that takes in a builder 
  //   builder
  //     .addCase(createGoal.pending, (state) => {       // a long chain of cases added to builder
  //       state.isLoading = true  
  //     })
  //     .addCase(createGoal.fulfilled, (state, action) => {   
  //       state.isLoading = false
  //       state.isSuccess = true
  //       state.goals.push(action.payload)        
  //       /* ^ this is why redux is great. We can simply just "push". This isn't something that can be done with 
  //       immutable state. Redux toolkit has some helpers that make doing theses things easier. 
  //       In authSlice the last one is simply state.goals = action.payload
  //       Here, we are pushing action.payload (the goal we just created). */
  //     })
  //     .addCase(createGoal.rejected, (state, action) => {    // same as in auth, but withou state.goal = null
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload       
  //     })

  //     // GETTING GOALS (MY WORK)
  //     .addCase(getGoals.pending, (state) => {               // I'm guessing its the same as createGoal
  //       state.isLoading = true                        
  //     })
  //     .addCase(getGoals.fulfilled, (state, action) => {   
  //       state.isLoading = false
  //       state.isSuccess = true
  //       // state.goals.push(action.payload)         // this will definitely be different.
  //       state.goals = action.payload                // here's what we do instead. Not my work
  //     })
  //     .addCase(getGoals.rejected, (state, action) => {
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload
  //       //  state.message = null          // FOUND ANOTHER BUGGER
  //     })

  //     // DELETING GOALS (MY WORK), but not sure how to delete exactly 
  //     .addCase(deleteGoal.pending, (state) => {
  //       state.isLoading = true
  //     })
  //     .addCase(deleteGoal.fulfilled, (state, action) => {   
  //       state.isLoading = false
  //       state.isSuccess = true
  //       state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)  
  //       /* interesting right here ^^^ we take out the deleted goal from the ui; otherwise,
  //       the goal won't disappear until after we reload the page, which isn't what we want.   
  //       We delete the goal whose id is equal to the current payload's id.          
  //       */
  //     })
  //     .addCase(deleteGoal.rejected, (state, action) => {    // no changes here.
  //       state.isLoading = false
  //       state.isError = true
  //       state.message = action.payload    
        
  //       state.message = null
  //     })
  // }  
  
  // BRAD'S REDUCERS
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const {reset} = goalSlice.actions   // remember: reset needs to be exported from the actions
export default goalSlice.reducer           // the reducer itself is exported.
// after exporting, we can add to app/store.js
// we dont do the same kind of exporting for getGoals since that is not in the actions