import { Target, Trophy, Clock, Award, RefreshCcw } from 'lucide-react'
import React from 'react'

function Results() {
  return (
    <div className='max-w-4xl mx-auto'>
      <div className='bg-white rounded-2xl shadow-xl p-8 text-center'>

        {/*  Header */}
        <div className='mb-8'>
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6`}>
            <Trophy className='w-12 h-12'/>
          </div>
          <h1 className='text-4xl font-bold text-gray-800'>Quiz Complete</h1>
          <p className='text-2xl font-semibold mb-6'>Performance Message</p>
        </div>

        {/* Cards */}
        <div className='grid md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl'>
            <div className='flex items-center justify-center mb-4'>
              <Target className='w-8 h-8 text-blue-600'/>
            </div>
            <div className='text-2xl font-bold text-blue-800 mb-2'>
              Score / Total Question
            </div>
            <div className='text-blue-600 font-medium'>
              Question Correct
            </div>
          </div>

          <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl'>
            <div className='flex items-center justify-center mb-4'>
              <Award className='w-8 h-8 text-purple-600'/>
            </div>
            <div className='text-2xl font-bold text-purple-800 mb-2'>
              Percentage
            </div>
            <div className='text-purple-600 font-medium'>
              Score Percentage
            </div>
          </div>

          <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl'>
            <div className='flex items-center justify-center mb-4'>
              <Clock className='w-8 h-8 text-green-600'/>
            </div>
            <div className='text-2xl font-bold text-green-800 mb-2'>
              Timer
            </div>
            <div className='text-green-600 font-medium'>
              Time Used
            </div>
          </div>
        </div>

        {/* Result  */}
        <div className='mb-8'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>
            Question Review
          </h3>
          {/* Displaying Dynamic Questions */}
          <div className='grid gap-4 max-h-64 overflow-y-auto'></div>
          <button
          className='inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600
          text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200
          shadow-lg font-semibold text-lg cursor-pointer'
          >
            <RefreshCcw size={24} className='pr-2'/>
            Take Quiz Again 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
