import person from "../assets/images/person3.jpg";
import file from "../assets/files/sample.pdf";
import p1 from "../assets/images/person.jpg";
import p2 from "../assets/images/person2.jpg";
import p3 from "../assets/images/person4.jpg";
import p4 from "../assets/images/person5.jpg";
import p5 from "../assets/images/person6.jpg";
import p7 from "../assets/images/person7.jpg";
import b1 from "../assets/images/bgimg1.jpg";
import b2 from "../assets/images/bgimg2.jpg";
import b3 from "../assets/images/bgimg3.jpg";
import b4 from "../assets/images/bgimg4.jpg";
import b5 from "../assets/images/bgimg5.jpg";

export const roles = {
  STUDENT: 1001,
  STAFF: 1002,
  ADMIN: 1003,
};

export const users = [
  {
    id: 1,
    userId: "STU1001",
    name: "John Doe",
    username: "johnDoe",
    password: "pass123",
    profileImg: p1,
    status: "active",
    email: "john.doe@example.com",
    role: [roles.ADMIN],
  },
  {
    id: 2,
    userId: "STU1002",
    name: "Alice Johnson",
    username: "aliceJohnson",
    password: "pass456",
    profileImg: p2,
    status: "active",
    email: "alice.johnson@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 3,
    userId: "STU1003",
    name: "Bob Smith",
    username: "bobSmith",
    password: "pass789",
    profileImg: p3,
    status: "active",
    email: "bob.smith@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 4,
    userId: "STU1004",
    name: "Eva Martinez",
    username: "evaMartinez",
    password: "passABC",
    profileImg: p4,
    status: "active",
    email: "eva.martinez@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 5,
    userId: "STU1005",
    name: "Michael Brown",
    username: "michaelBrown",
    password: "passXYZ",
    profileImg: p5,
    status: "active",
    email: "michael.brown@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 6,
    userId: "STU1006",
    name: "Lily White",
    username: "lilyWhite",
    password: "pass123",
    profileImg: p1,
    status: "active",
    email: "lily.white@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 7,
    userId: "STU1007",
    name: "Charlie Green",
    username: "charlieGreen",
    password: "pass456",
    profileImg: p7,
    status: "active",
    email: "charlie.green@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 8,
    userId: "STU1008",
    name: "Sophia Black",
    username: "sophiaBlack",
    password: "pass789",
    profileImg: p2,
    status: "active",
    email: "sophia.black@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 9,
    userId: "STU1009",
    name: "Oliver Grey",
    username: "oliverGrey",
    password: "passABC",
    profileImg: p3,
    status: "active",
    email: "oliver.grey@example.com",
    role: [roles.STUDENT],
  },
  {
    id: 10,
    userId: "STU1010",
    name: "Emma Red",
    username: "emmaRed",
    password: "passXYZ",
    profileImg: p4,
    status: "active",
    email: "emma.red@example.com",
    role: [roles.STUDENT],
  },
];

export const commonValidationError = "Field is required";

export const commonDateFormat = "DD/MM/YYYY";

export const globalDateFormat = "YYYY-MM-DD";

export const nationalities = [
  {
    nationalityId: 1,
    nationalityCode: "LK",
    nationality: "Sri Lankan",
  },
  {
    nationalityId: 2,
    nationalityCode: "US",
    nationality: "American",
  },
  {
    nationalityId: 3,
    nationalityCode: "GB",
    nationality: "British",
  },
  {
    nationalityId: 4,
    nationalityCode: "CN",
    nationality: "Chinese",
  },
  {
    nationalityId: 5,
    nationalityCode: "IN",
    nationality: "Indian",
  },
  {
    nationalityId: 6,
    nationalityCode: "JP",
    nationality: "Japanese",
  },
  {
    nationalityId: 7,
    nationalityCode: "BR",
    nationality: "Brazilian",
  },
  {
    nationalityId: 8,
    nationalityCode: "AU",
    nationality: "Australian",
  },
  {
    nationalityId: 9,
    nationalityCode: "FR",
    nationality: "French",
  },
  {
    nationalityId: 10,
    nationalityCode: "DE",
    nationality: "German",
  },
];

export const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const staffTypes = [
  {
    label: "Staff",
    value: 1,
  },
  {
    label: "Student",
    value: 2,
  },
];

export const studentData = [
  {
    id: 1,
    code: "STU1001",
    name: "Mary Jane",
    username: "MaryJane",
    courseId: 1,
    profileImg: p1,
    status: "active",
    staffTypeId: 2,
  },
  {
    id: 2,
    code: "STU1002",
    name: "Mary Jane",
    username: "MaryJane",
    courseId: 1,
    profileImg: p1,
    status: "active",
    staffTypeId: 2,
  },
  {
    id: 3,
    code: "STU1003",
    name: "Mary Jane",
    username: "MaryJane",
    courseId: 1,
    profileImg: p1,
    status: "active",
    staffTypeId: 2,
  },
  {
    id: 4,
    code: "STU1004",
    name: "Mary Jane",
    username: "MaryJane",
    courseId: 1,
    profileImg: p1,
    status: "active",
    staffTypeId: 2,
  },
  {
    id: 5,
    code: "STU1005",
    name: "Mary Jane",
    username: "MaryJane",
    courseId: 1,
    profileImg: p1,
    status: "active",
    staffTypeId: 2,
  },
];

export const userData = [
  {
    id: 1,
    userId: "USR1001",
    username: "Jane_Allen",
    profileImg: p1,
    moduleId: 1,
    status: "active",
    name: "Jane Allen",
    designation: "Senior Lecturer",
    staffTypeId: 1,
  },
  {
    id: 2,
    userId: "USR1002",
    username: "John_Doe",
    profileImg: p2,
    moduleId: 2,
    status: "active",
    name: "John Doe",
    designation: "Assistant Professor",
    staffTypeId: 1,
  },
  {
    id: 3,
    userId: "USR1003",
    username: "Emily_Smith",
    profileImg: p3,
    moduleId: 3,
    status: "inactive",
    name: "Emily Smith",
    designation: "Associate Professor",
    staffTypeId: 1,
  },
  {
    id: 4,
    userId: "USR1004",
    username: "Alex_Cooper",
    profileImg: p4,
    moduleId: 4,
    status: "active",
    name: "Alex Cooper",
    designation: "Professor",
    staffTypeId: 1,
  },
  {
    id: 5,
    userId: "USR1005",
    username: "Sophia_Wang",
    profileImg: p5,
    moduleId: 1,
    status: "active",
    name: "Sophia Wang",
    designation: "Lecturer",
    staffTypeId: 1,
  },
  {
    id: 6,
    userId: "USR1006",
    username: "Chris_Jackson",
    profileImg: p7,
    moduleId: 2,
    status: "active",
    name: "Chris Jackson",
    designation: "Instructor",
    staffTypeId: 1,
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

export const moduleData = [
  {
    id: 1,
    courseId: 1,
    title: "Introduction to Database Systems",
    img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
    code: "MD10001",
    lead: 1,
    createdDate: "2023-11-01",
    status: "active",
    collaborators: [1, 2, 3, 4, 5],
    learningObjectives: [
      "Understand the fundamentals of database systems",
      "Design and implement relational databases",
      "Optimize database performance",
      "Implement data security measures",
      "Apply normalization techniques",
      "Utilize database management tools",
    ],
  },
  {
    id: 2,
    courseId: 1,
    title: "Advanced Database Management",
    img: "https://zeenea.com/wp-content/uploads/2023/01/databases-zeenea.jpg.webp",
    code: "MD10002",
    lead: 2,
    createdDate: "2023-11-01",
    status: "inactive",
    collaborators: [1, 2, 3, 4, 5],
    learningObjectives: [
      "Explore advanced topics in database management",
      "Implement transaction management",
      "Optimize complex queries",
      "Apply indexing strategies",
      "Utilize database triggers and stored procedures",
      "Manage distributed databases",
    ],
  },
  {
    id: 3,
    courseId: 2,
    title: "HTML and CSS Fundamentals",
    img: "https://example.com/html-css-image.jpg",
    code: "MD10003",
    lead: 1,
    createdDate: "2023-11-01",
    status: "active",
    collaborators: [1, 2, 3],
    learningObjectives: [
      "Understand the basics of HTML and CSS",
      "Create and style web pages",
      "Implement responsive web design",
      "Utilize CSS frameworks",
      "Optimize web performance",
    ],
  },
  {
    id: 4,
    courseId: 3,
    title: "Introduction to Artificial Intelligence",
    img: "https://example.com/ai-image.jpg",
    code: "MD10004",
    lead: 3,
    createdDate: "2023-11-01",
    status: "active",
    collaborators: [2, 4, 5],
    learningObjectives: [
      "Understand the principles of artificial intelligence",
      "Implement machine learning algorithms",
      "Develop intelligent agents",
      "Apply natural language processing techniques",
      "Explore ethical considerations in AI",
      "Utilize AI tools and frameworks",
    ],
  },
  // Additional modules can be added similarly for other courses
];

export const courseData = [
  {
    id: 1,
    code: "C-1001",
    name: "Database Management Systems",
    description: "Explore the fundamentals of database management systems.",
    status: "active",
    category: "1",
    durationType: "years",
    courseDuration: "1",
    targetAudience: "1",
    enrollment: "1",
    courseFormat: "physical",
  },
  {
    id: 2,
    code: "C-1002",
    name: "Web Development",
    description: "Learn the essentials of web development and design.",
    status: "inactive",
    category: "1",
    durationType: "years",
    courseDuration: "1",
    targetAudience: "1",
    enrollment: "1",
    courseFormat: "physical",
  },
  {
    id: 3,
    code: "C-1003",
    name: "Artificial Intelligence",
    description: "Dive into the exciting world of artificial intelligence.",
    status: "active",
    category: "1",
    durationType: "years",
    courseDuration: "1",
    targetAudience: "1",
    enrollment: "1",
    courseFormat: "physical",
  },
  {
    id: 4,
    code: "C-1004",
    name: "Computer Networks",
    description:
      "Understand the principles of computer networks and communication.",
    status: "active",
    category: "1",
    durationType: "years",
    courseDuration: "1",
    targetAudience: "1",
    enrollment: "1",
    courseFormat: "physical",
  },
  {
    id: 5,
    code: "C-1005",
    name: "Data Science",
    description: "Explore the science of extracting insights from data.",
    status: "active",
    category: "1",
    durationType: "years",
    courseDuration: "1",
    targetAudience: "1",
    enrollment: "1",
    courseFormat: "physical",
  },
  {
    id: 6,
    code: "C-1006",
    name: "Software Engineering",
    description: "Master the principles and practices of software engineering.",
    status: "inactive",
    category: "1",
    durationType: "years",
    courseDuration: "1",
    targetAudience: "1",
    enrollment: "1",
    courseFormat: "physical",
  },
];

export const forumData = [
  {
    id: 1,
    title: "Introduction to Programming",
    createdUserId: 1,
    description:
      "Discuss the fundamentals of programming languages, share tips, and ask questions related to coding basics.",
    date: "2023-01-15",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b1,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 2,
    title: "Mathematics for Machine Learning",
    createdUserId: 1,
    description:
      "Explore mathematical concepts crucial for understanding machine learning algorithms. Dive into discussions on linear algebra, calculus, and statistics.",
    date: "2023-02-05",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b2,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    createdUserId: 1,
    description:
      "Join the conversation on web development technologies, frameworks, and best practices. Share your projects and seek feedback from the community.",
    date: "2023-03-10",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b3,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 4,
    title: "Artificial Intelligence Ethics",
    createdUserId: 1,
    description:
      "Delve into the ethical considerations surrounding artificial intelligence. Discuss responsible AI development, bias, and the societal impact of AI.",
    date: "2023-04-02",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b4,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 5,
    title: "Data Science Challenges",
    createdUserId: 1,
    description:
      "Share your experiences tackling real-world data science challenges. Discuss data cleaning, feature engineering, and model evaluation strategies.",
    date: "2023-05-20",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b5,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 6,
    title: "Cybersecurity Awareness",
    createdUserId: 1,
    description:
      "Stay informed about the latest trends in cybersecurity. Discuss threat mitigation, best practices, and share resources to enhance digital security.",
    date: "2023-06-08",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b1,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 7,
    title: "Mobile App Development Insights",
    createdUserId: 1,
    description:
      "Connect with fellow mobile app developers. Discuss platform-specific challenges, user experience design, and share insights into the app development lifecycle.",
    date: "2023-07-15",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b2,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
  {
    id: 8,
    title: "Blockchain and Cryptocurrency",
    createdUserId: 1,
    description:
      "Explore the world of blockchain technology and cryptocurrencies. Discuss decentralized finance, smart contracts, and the future of digital currency.",
    date: "2023-08-03",
    people: [p1, p2, p3, p4, p5],
    code: "F1001",
    img: b5,
    replies: [
      {
        userId: 1,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 2,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
      {
        userId: 3,
        postedDate: "2023-11-01",
        reply:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deserunt doloremque? Tenetur modi, aperiam ad magni officia quaerat! Quis possimus odit nobis incidunt unde libero aliquam maiores aut ut beatae!",
      },
    ],
  },
];
