export const sampleQuestions = [
  {
    id: 1,
    question: "What is the purpose of the useEffect hook in React?",
    options: [
      "To manage component state updates",
      "To perform side effects in functional components",
      "To create global styles",
      "To optimize component rendering"
    ],
    correctAnswer: 1, 
    explanation: "useEffect allows you to perform side effects such as fetching data, setting up subscriptions, or manipulating the DOM."
  },

  {
    id: 2,
    question: "Which of the following best describes JSX?",
    options: [
      "A CSS preprocessor for styling React apps",
      "A syntax extension that lets you write HTML-like code in JavaScript",
      "A tool for managing global state",
      "A backend framework used with Node.js"
    ],
    correctAnswer: 2,
    explanation: "JSX lets you write HTML-like tags directly inside JavaScript, making UI structure easier to visualize."
  },

  {
    id: 3,
    question: "What does 'lifting state up' mean in React?",
    options: [
      "Moving state to a parent component so child components can share it",
      "Storing data in localStorage",
      "Using Redux for global state",
      "Directly mutating state in a child component"
    ],
    correctAnswer: 3,
    explanation: "Lifting state up means keeping shared state in the closest common ancestor so multiple children can access it."
  },

  {
    id: 4,
    question: "Which HTTP method is typically used to update existing data on a server?",
    options: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    correctAnswer: 4,
    explanation: "PUT is generally used for updating or replacing existing resources on the server."
  },

  {
    id: 5,
    question: "What does the Virtual DOM improve in React applications?",
    options: [
      "Security of the application",
      "Performance by minimizing direct DOM manipulation",
      "Database operations",
      "Server-side rendering only"
    ],
    correctAnswer: 5,
    explanation: "The Virtual DOM improves performance by batching and optimizing real DOM updates."
  },

  {
    id: 6,
    question: "In JavaScript, which keyword declares a block-scoped variable?",
    options: [
      "var",
      "let",
      "function",
      "define"
    ],
    correctAnswer: 6,
    explanation: "The 'let' keyword creates block-scoped variables, unlike 'var' which is function-scoped."
  },

  {
    id: 7,
    question: "What is React Router primarily used for?",
    options: [
      "Handling database queries",
      "Managing navigation and page routing in React apps",
      "Styling components",
      "Bundling the application"
    ],
    correctAnswer: 7,
    explanation: "React Router allows you to create multiple pages and handle navigation in single-page applications."
  },

  {
    id: 8,
    question: "Which lifecycle is replicated when using useEffect with an empty dependency array?",
    options: [
      "componentDidUpdate",
      "componentWillUnmount",
      "componentDidMount",
      "shouldComponentUpdate"
    ],
    correctAnswer: 8,
    explanation: "useEffect(() => {}, []) runs only once when the component mounts, similar to componentDidMount."
  }
];
