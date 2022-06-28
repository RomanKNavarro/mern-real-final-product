// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice.js';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer
//   },
// });

// COPIED THIS SHIT OVA
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice'    
/* just relized: neither authReducer nor goalReducer are ever actually defined in their files.
So where did they come from??? */

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer
  },
});

