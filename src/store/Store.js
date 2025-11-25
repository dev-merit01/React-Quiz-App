import {  configureStore } from '@reduxjs/toolkit'
import quizReducer from './QuizSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer:{
        quiz: quizReducer,
        auth: authReducer,
    }
})

