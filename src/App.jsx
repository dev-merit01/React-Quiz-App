import React from 'react'
import Quiz from './components/Quiz'
import {Provider} from 'react-redux'
import {store} from './store/Store'

function App() {
  return (
    <Provider store={store}>
      <Quiz/>
    </Provider>
  )
}

export default App
