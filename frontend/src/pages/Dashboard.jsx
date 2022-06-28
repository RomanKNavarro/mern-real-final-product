// // COPIED THIS SHIT OVER:
// import {useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'    // used since we want to redirect the user.
// import {useSelector, useDispatch} from 'react-redux'         
// // Selector to grab user from state to see if we're logged in. Dispatch to dispatch the getGoals func.
// import GoalForm from '../components/goalForm'   // import newly created goal form
// import GoalItem from '../components/goalItem'
// import Spinner from '../components/Spinner'
// // we wanna use the spinner here as well, when we're getting the components.
// import {getGoals, reset} from '../features/goals/goalSlice'
// // we import from the slice, NOT goalService.

// function Dashboard() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const {user} = useSelector((state) => state.auth) // specify that user is coming from state.auth.
//   const {goals, isLoading, isError, message} = useSelector((state) => state.goals)   
//   // ME. Specify goals as coming from state.goals
//   // BRAD: goals isn't the only thing we want to import from state.goals.

//   useEffect(() => {
//     if (isError) {
//       console.log(message)
//     }

//     if (!user) {
//       navigate('/login')    // very cool right here: upon opening the page, immediately direct us to the login page. 
//     }

//     dispatch(getGoals())

//     return () => {
//       dispatch(reset())
//     }
//     /* when we leave the dashboard, we want the goals to clear. Remember from last vid (I didn't) that when you want
//     to do something when the component unmounts, we return a func in the useEffect which dispatches the reset func.
//     */
//   }, [user, navigate, isError, message, dispatch])

//   // useEffect(() => {
//   //   if (goals.length !== 0) {
//   //     dispatch(getGoals)
//   //   }
//   // }, [dispatch, goals])      ME: WRONG. We only need a sinlge useEffect for both users and goals.

//   if (isLoading) {
//     return <Spinner/>     // put this in dashboard func as well.
//   }

//   return (
//     <>
//       <section className='heading'>
//         {/* we have access to the user, as defined above ^^
//         This syntax means: if user, show user.name. Pretty neat. */}
//         <h1>Welcome {user && user.name}</h1>    
//         <p>Goals Dashboard</p>
//       </section>
//       <GoalForm/>

//       {/* created with section.content */}
//       <section className="content">
//         {goals.length > 0 ? (                         
//           // if no goals, display string; else, display GoalItem elements for each goal created.
//           // created with div.goals
//           <div className="goals">
//             {goals.map((goal) => (
//               <GoalItem key={goal._id} goal={goal}/>
//             ))}
//           </div>
//         ) : (
//           <h3>Youba not setta goals</h3>
//         )}
//       </section>
//     </>
//   )
// }

// export default Dashboard

// // ORIGINAL CODE
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// function Dashboard() {
//   return (
//     <div>Dashboard</div>
//   )
// }

// export default Dashboard

// BRAD'S CODE
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    //dispatch(getGoals())

    // BRAD'S SHIT (same shit as mine):
    // dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} /> 
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard