import React, { useEffect } from 'react'
import QuizStart from './QuizStart'
import ProgressBar from './ProgressBar'
import Timer from './Timer'
import Questions from './Question'
import Results from './Results'
import {useSelector, useDispatch} from 'react-redux'
import { setQuestions } from '../store/QuizSlice'
import {sampleQuestions} from '../data/questions'


function Quiz() {

  const dispatch = useDispatch()

  //load questions
  useEffect(() => {
    dispatch(setQuestions(sampleQuestions))
  }, [])

  const {
    questions,
    currentQuestionIndex,
    answers,
    isQuizCompleted,
    isTimerActive,
  } = useSelector((state) => state.quiz)

  //Loading Quiz
  if(questions.length === 0){
    return(
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center
      justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gary-600'>Loading</p>
        </div>
      </div>
    )
  }
  //Completed Quiz
  if(isQuizCompleted){
    return(
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center
      justify-center py-8 px-4'>
        <Results/>
      </div>
    )
  }

   //Completed Quiz
  if(!isTimerActive && answers.length === 0){
    return(
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center
      justify-center py-8 px-4'>
        <QuizStart/>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple py-8 px-4'>
      <div className='max-w-4xl mx-auto mb-8'>
        <div className='bg-white rounded-xl shadow-lg p-6'>
           <div className='flex felx-col md:flx-row md:items-center md:justify-between space-y-4 md:space-y-0'>
               <div className='flex-1'>
                <ProgressBar current={currentQuestionIndex +1} total={questions.length} />
               </div>
               <div className='md:ml-6'>
                <Timer/>
               </div>
            </div>
        </div>
     </div>
     <Questions/>
    </div>
  )
}

export default Quiz
