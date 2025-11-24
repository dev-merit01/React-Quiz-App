import { Clock, Import } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeLeft, isTimerActive } from '../store/QuizSlice';


function Timer() {

  const dispatch = useDispatch()
  const {timeLeft, isTimerActive} = useSelector((state) => state.quiz)

  useEffect(()=>{

  },[])

  //Step 1
  const formatTime = (seconds) => {
    const min = Math.floor(seconds/60)
    const secs = seconds % 60
    return `${min.toString().padStart(2, 0)}:${secs.toString().padStart(2, 0)}`
  }

  return (
    <div className={`flex items-center space-x-2`}>
      <Clock size={20}/>
      <span className='font-mono text-lg font-semibold'>{formatTime(timeLeft)}</span>
    </div>
  )
}

export default Timer
