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

    nextQuestion: (state) => {
      state.showExplanation = false;

      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.isQuizCompleted = true;
        state.isTimerActive = false;
      }
    },

    previousQuestion: (state) => {
      state.showExplanation = false;
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;

        state.answers = state.answers.filter((answer) => answer.questionId !== state.questions[state.currentQuestionIndex].id)
        state.score = state.answers.filter((answer) => answer.isCorrect).length
      }
    },

    decreamentTimer: (state) => {
      if (state.timeLeft > 0 && state.isTimerActive) {
        state.timeLeft -= 1;
      } else if (state.timeLeft === 0) {
        state.isQuizCompleted = true;
        state.isTimerActive = false;
      }
    },

    resetQuiz: (state) => {
        state.currentQuestionIndex = 0
        state.answers = []
        state.isQuizCompleted = false
        state.score = 0
        state.timeLeft = 300
        state.isTimerActive = false
        state.showExplanation = false
    },

    answerQuestions: (state, action) => {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isCorrect = action.payload.selectedOption === currentQuestion.correctAnswer;

      const answer = {
        questionId: currentQuestion.id,
        selectedOption: action.payload.selectedOption,
        isCorrect,
      };

      state.answers.push(answer);

      if (isCorrect) {
        state.score += 1;
      }

      state.showExplanation = true;
    },
  },
});

export const {
  setQuestions,
  startQuiz,
  decreamentTimer,
  answerQuestions,
  nextQuestion,
  previousQuestion,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
