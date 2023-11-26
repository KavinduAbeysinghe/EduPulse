import person from "../assets/images/person3.jpg";
import file from "../assets/files/sample.pdf";

export const userData = [
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: person,
    module: "Database Systems",
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
  },
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: person,
    module: "Database Systems",
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
  },
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: person,
    module: "Database Systems",
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
  },
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: person,
    module: "Database Systems",
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
  },
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: person,
    module: "Database Systems",
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
  },
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: person,
    module: "Database Systems",
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
  },
];

export const moduleMaterials = [
  {
    ID: 1,
    title: "Week 1",
    data: [
      {
        title: "Database Management Systems Lecture",
        file: file,
      },
      {
        title: "Database Management Systems Tutorial",
        file: file,
      },
    ],
  },
  {
    ID: 2,
    title: "Week 2",
    data: [
      {
        title: "Database Management Systems Lecture",
        file: file,
      },
      {
        title: "Database Management Systems Tutorial",
        file: file,
      },
    ],
  },
  {
    ID: 3,
    title: "Week 3",
    data: [
      {
        title: "Database Management Systems Lecture",
        file: file,
      },
      {
        title: "Database Management Systems Tutorial",
        file: file,
      },
    ],
  },
  {
    ID: 4,
    title: "Week 4",
    data: [
      {
        title: "Database Management Systems Lecture",
        file: file,
      },
      {
        title: "Database Management Systems Tutorial",
        file: file,
      },
    ],
  },
];

export const quizData = [
  {
    ID: 1,
    title: "Week 1",
    data: [
      {
        quizId: 1,
        title: "Quiz 1",
        minutes: 60,
        seconds: 59,
        questionData: [
          {
            questionId: 1,
            question: "What is the capital of a binary number system?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "0" },
              { optionId: 2, option: "1" },
              { optionId: 3, option: "2" },
              { optionId: 4, option: "10" },
            ],
          },
          {
            questionId: 2,
            question:
              "Which data structure follows the Last In First Out (LIFO) principle?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Stack" },
              { optionId: 2, option: "Queue" },
              { optionId: 3, option: "Linked List" },
              { optionId: 4, option: "Array" },
            ],
          },
          {
            questionId: 3,
            question: "What is the purpose of an index in a database?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Improves query performance" },
              { optionId: 2, option: "Stores primary keys" },
              { optionId: 3, option: "Provides security" },
              { optionId: 4, option: "Manages transactions" },
            ],
          },
          {
            questionId: 4,
            question: "In programming, what does 'API' stand for?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Application Programming Interface" },
              { optionId: 2, option: "Advanced Programming Interface" },
              { optionId: 3, option: "Application Program Interface" },
              { optionId: 4, option: "Advanced Program Interface" },
            ],
          },
          {
            questionId: 5,
            question:
              "What is the main purpose of the 'git' version control system?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Tracking changes in source code" },
              { optionId: 2, option: "Managing databases" },
              { optionId: 3, option: "Creating graphical user interfaces" },
              { optionId: 4, option: "Running server-side scripts" },
            ],
          },
          {
            questionId: 6,
            question: "What does HTML stand for in web development?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Hypertext Markup Language" },
              { optionId: 2, option: "Hyperlink and Text Markup Language" },
              { optionId: 3, option: "High-Level Text Markup Language" },
              { optionId: 4, option: "Hypertext and Links Markup Language" },
            ],
          },
          {
            questionId: 7,
            question:
              "Which programming language is known for its focus on readability and ease of use?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Python" },
              { optionId: 2, option: "C++" },
              { optionId: 3, option: "Java" },
              { optionId: 4, option: "JavaScript" },
            ],
          },
          {
            questionId: 8,
            question: "What is the role of a compiler in programming?",
            answerOptionId: 1,
            options: [
              {
                optionId: 1,
                option: "Translates high-level code to machine code",
              },
              { optionId: 2, option: "Manages database connections" },
              { optionId: 3, option: "Creates graphical user interfaces" },
              { optionId: 4, option: "Executes server-side scripts" },
            ],
          },
          {
            questionId: 9,
            question:
              "What is the significance of the Turing test in artificial intelligence?",
            answerOptionId: 1,
            options: [
              {
                optionId: 1,
                option:
                  "Assesses a machine's ability to exhibit intelligent behavior",
              },
              { optionId: 2, option: "Tests network security" },
              { optionId: 3, option: "Measures processing speed" },
              { optionId: 4, option: "Evaluates software usability" },
            ],
          },
          {
            questionId: 10,
            question: "In computer networking, what does 'HTTP' stand for?",
            answerOptionId: 1,
            options: [
              { optionId: 1, option: "Hypertext Transfer Protocol" },
              { optionId: 2, option: "High-Level Transfer Protocol" },
              { optionId: 3, option: "Hyperlink and Text Transfer Protocol" },
              { optionId: 4, option: "Hypertext and Links Transfer Protocol" },
            ],
          },
        ],
      },
    ],
  },
];
