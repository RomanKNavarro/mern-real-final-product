// PASTED THIS SHIT OVA
import {useState} from 'react'
import {useDispatch} from 'react-redux'
// import {createGoal} from '../features/goals/goalSice'    // HAHA GOALSICE WTF 
import { createGoal } from '../features/goals/goalSlice'   // HEY ASSHOLE: DONT FORGET TO ADD / AFTER ..

// created with rfce
function GoalForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault()        // used to prevent the default form behavior of submitting    
    dispatch(createGoal({ text }))
    setText('')  
  }
  return (
    <section className='form'>
      {/* straightforward :) For the text field */}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input 
            type='text' 
            name='text' 
            id='text'
            value={text} 
            onChange={(e) => setText(e.target.value)}
          />   
        </div>
        {/* created with .form-group */}
        <div className="form-group">
          {/* created with button.btn.btn-block */}
          <button className="btn btn-block" type='submit'>
            Add Goal
          </button>
        </div>    
      </form>
    </section>
  )
}

export default GoalForm