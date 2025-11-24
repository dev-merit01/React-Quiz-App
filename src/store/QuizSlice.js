import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  isQuizCompleted: false,
  score: 0,
  timeLeft: 300,
  isTimerActive: false,
  showExplanation: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    startQuiz: (state) => {
      state.isTimerActive = true;
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.score = 0;
      state.isQuizCompleted = false;
      state.timeLeft = 300;
    },
  },
});

export const { setQuestions, startQuiz,timeLeft,isTimerActive } = quizSlice.actions;
export default quizSlice.reducer;
