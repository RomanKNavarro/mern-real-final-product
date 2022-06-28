// COPIED THIS SHIT OVA

import {useDispatch} from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'


// CREATED WITH RFCE
function GoalItem({goal}) { 
  const dispatch = useDispatch()
  return (
    <div className="goal">
      <div>
        {/* show the date goal was created. Forgot where 'createdAt' is from */}
        {new Date(goal.createdAt).toLocaleString('en-US')}   
        {/* HAHAHA ITS "LOCALE" NOT "LOCAL" HAHAHA. Got an error from typo */}
      </div>
      <h2>{goal.text}</h2>
      {/* CREATED WITH BUTTON.CLOSE. This is the nice little X icon */}
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">X</button>      
      {/* dispatch the deleteGoal func from goalSlice when close button is pressed */}
    </div>
  )
}

export default GoalItem