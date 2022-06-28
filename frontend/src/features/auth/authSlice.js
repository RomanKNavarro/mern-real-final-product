// a couple of things imported from the redux toolkit
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'    

import authService from './authService'

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))   
// localStorage can only have strings, so we parse it. Forgot wtf localStorage is.


const initialState = {
  user: user ? user : null,   // if user exists in the storage, use that. Otherwise, null
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register user (async thunk funcs)
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {   
    return await authService.register(user);   
     // here we call the authService func we created and exported in authService.js
  } catch (error) {
    const message = 
    (error.response && 
      error.response.data && 
      error.response.data.message) || 
      error.message || 
      error.toString() 
    return thunkAPI.rejectWithValue(message)
    /* if any of the above exist, we use this thunkAPI func to reject and send a message 
    as the payload */
  }
})
/* the first arg is the action and the second is an async func, which takes in a user (passed in from the 
register page) and the thunkAPI, which we'll use for the try/catch. The try is where we make our request,
which is a promise (hence, await)  */

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {   
    return await authService.login(user);   
  } catch (error) {                         // all the error stuff will be the same.
    const message = 
    (error.response && 
      error.response.data && 
      error.response.data.message) || 
      error.message || 
      error.toString() 
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()    // logout function we'll create in authService.js
})

export const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {         // any reducer funcs passed in here won't be asynchronous, or thunk funcs.
    reset: (state) => {         // reset state to its initial values
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
    }
  },
  extraReducers: (builder) => {     // thunk funcs will go in here. Takes an arg of "builder"
    builder
      .addCase(register.pending, (state) => {     // when register page is loading 
        state.isLoading = true  
      })
      .addCase(register.fulfilled, (state, action) => {   // when it's complete
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        /* recall that in the try/catch, we call thunkAPI.rejectWithValue(message),
        which is gonna reject and pass that message as the payload. */
        state.user = null
      })

      .addCase(login.pending, (state) => {            // we copy all the register cases for login.
        state.isLoading = true                        // everything is the exact same thing/
      })
      .addCase(login.fulfilled, (state, action) => {   
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })


      .addCase(logout.fulfilled, (state) => {     // new case for logging out
        state.user = null
      })
  }    
})

export const {reset} = authSlice.actions  // here's how to export the reducer func(s) 
export default authSlice.reducer          // hmmmm....