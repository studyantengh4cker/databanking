export const DeansProHeadsData = [
  {
    IDNumber: "1999-12012",
    firstName: "COE",
    lastName: "Dean",
    email: "coedean@gmail.com",
    role: "Dean",
    college: "COE",
  },
  {
    IDNumber: "1223-2423",
    firstName: "Program",
    lastName: "Head",
    email: "cocprogram@gmail.com",
    role: "ProgramHead",
    college: "COC",
  },
  {
    IDNumber: "1889-32451",
    firstName: "CED",
    lastName: "Dean",
    email: "ceddean@gmail.com",
    role: "Dean",
    college: "CED",
  },
  {
    IDNumber: "1237-98231",
    firstName: "Program",
    lastName: "Head",
    email: "coeprogram@gmail.com",
    role: "ProgramHead",
    college: "COE",
  },
  {
    IDNumber: "2999-90281",
    firstName: "Program",
    lastName: "Head",
    email: "cedprogram@gmail.com",
    role: "ProgramHead",
    college: "CED",
  },
  {
    IDNumber: "5461-23192",
    firstName: "COC",
    lastName: "Dean",
    email: "cocdean@gmail.com",
    role: "Dean",
    college: "COC",
  },
];

export const FacultyData = [
  {
    IDNumber: "2001-56342",
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@university.com",
    role: "Faculty",
    college: "COE",
  },
  {
    IDNumber: "1987-23456",
    firstName: "Alice",
    lastName: "Brown",
    email: "alicebrown@university.com",
    role: "Faculty",
    college: "COC",
  },
  {
    IDNumber: "2010-78412",
    firstName: "Michael",
    lastName: "Jones",
    email: "michaeljones@university.com",
    role: "Faculty",
    college: "COE",
  },
  {
    IDNumber: "2022-89123",
    firstName: "Emily",
    lastName: "Davis",
    email: "emilydavis@university.com",
    role: "Faculty",
    college: "CED",
  },
  {
    IDNumber: "1995-48231",
    firstName: "Daniel",
    lastName: "Garcia",
    email: "danielgarcia@university.com",
    role: "Faculty",
    college: "COC",
  },
  {
    IDNumber: "2003-11234",
    firstName: "Sophia",
    lastName: "Wilson",
    email: "sophiawilson@university.com",
    role: "Faculty",
    college: "CED",
  },
];

export const StudentData = [
  {
    IDNumber: "2024-00123",
    firstName: "Liam",
    lastName: "Johnson",
    email: "liamjohnson@university.com",
    role: "Student",
    college: "COE",
  },
  {
    IDNumber: "2023-04567",
    firstName: "Olivia",
    lastName: "Martinez",
    email: "oliviamartinez@university.com",
    role: "Student",
    college: "COC",
  },
  {
    IDNumber: "2024-09876",
    firstName: "Noah",
    lastName: "Williams",
    email: "noahwilliams@university.com",
    role: "Student",
    college: "CED",
  },
  {
    IDNumber: "2023-05678",
    firstName: "Emma",
    lastName: "Taylor",
    email: "emmataylor@university.com",
    role: "Student",
    college: "COE",
  },
  {
    IDNumber: "2024-06789",
    firstName: "James",
    lastName: "Anderson",
    email: "jamesanderson@university.com",
    role: "Student",
    college: "COC",
  },
  {
    IDNumber: "2023-07890",
    firstName: "Sophia",
    lastName: "Hernandez",
    email: "sophiahernandez@university.com",
    role: "Student",
    college: "CED",
  },
];

export const ReviewerData = [
    {
      title: "Mathematics Reviewer",
      description:
        "Comprehensive math reviewer covering essential topics for college entrance exams.",
      college: "COE",
      program: "Mechanical Engineering",
      SY: '2024-2025',
      isActive : true,
      sections: [
        {
          name: "Algebra",
          subtopics: [
            {
              name: "Linear Equations",
              questions: [
                {
                  question: "What is the solution to the equation 2x + 3 = 7?",
                  choices: ["x = 1", "x = 2", "x = 3", "x = 4"],
                  correctAnswer: "x = 2",
                },
                {
                  question: "Simplify: 3(x + 2) - 2(x - 3)",
                  choices: ["x + 12", "x + 6", "x + 3", "x - 6"],
                  correctAnswer: "x + 12",
                },
              ],
            },
            {
              name: "Quadratic Equations",
              questions: [
                {
                  question:
                    "What is the sum of the roots of the equation x² - 5x + 6 = 0?",
                  choices: ["5", "6", "1", "3"],
                  correctAnswer: "5",
                },
                {
                  question: "Solve: x² - 4x - 5 = 0",
                  choices: [
                    "x = 5, x = -1",
                    "x = 5, x = 1",
                    "x = -5, x = 1",
                    "x = -5, x = -1",
                  ],
                  correctAnswer: "x = 5, x = -1",
                },
              ],
            },
          ],
        },
        {
          name: "Trigonometry",
          subtopics: [
            {
              name: "Angles and Their Measures",
              questions: [
                {
                  question: "Convert 90 degrees to radians.",
                  choices: ["π/2", "π", "2π", "3π/2"],
                  correctAnswer: "π/2",
                },
                {
                  question: "What is the sine of 30 degrees?",
                  choices: ["0.5", "0.866", "1", "0"],
                  correctAnswer: "0.5",
                },
              ],
            },
            {
              name: "Trigonometric Identities",
              questions: [
                {
                  question: "Simplify: sin²x + cos²x",
                  choices: ["1", "sin²x", "cos²x", "0"],
                  correctAnswer: "1",
                },
                {
                  question: "What is tan(x) in terms of sin(x) and cos(x)?",
                  choices: [
                    "sin(x)/cos(x)",
                    "cos(x)/sin(x)",
                    "1/sin(x)",
                    "1/cos(x)",
                  ],
                  correctAnswer: "sin(x)/cos(x)",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Physics Reviewer",
      description:
        "A foundational reviewer for basic physics concepts and problem-solving.",
      college: "COE",
      program: "Electrical Engineering",
      SY: '2024-2025',
      isActive : true,
      sections: [
        {
          name: "Mechanics",
          subtopics: [
            {
              name: "Kinematics",
              questions: [
                {
                  question: "What is the formula for velocity?",
                  choices: [
                    "distance/time",
                    "time/distance",
                    "mass/acceleration",
                    "force/mass",
                  ],
                  correctAnswer: "distance/time",
                },
                {
                  question: "What is the acceleration due to gravity on Earth?",
                  choices: ["9.8 m/s²", "8.9 m/s²", "10 m/s²", "7.9 m/s²"],
                  correctAnswer: "9.8 m/s²",
                },
              ],
            },
            {
              name: "Dynamics",
              questions: [
                {
                  question: "What is Newton's second law of motion?",
                  choices: ["F = ma", "E = mc²", "F = Gm₁m₂/r²", "P = mv"],
                  correctAnswer: "F = ma",
                },
                {
                  question: "What is the unit of force?",
                  choices: ["Newton", "Joule", "Watt", "Pascal"],
                  correctAnswer: "Newton",
                },
              ],
            },
          ],
        },
        {
          name: "Thermodynamics",
          subtopics: [
            {
              name: "Heat and Temperature",
              questions: [
                {
                  question: "What is the SI unit of temperature?",
                  choices: ["Kelvin", "Celsius", "Fahrenheit", "Rankine"],
                  correctAnswer: "Kelvin",
                },
                {
                  question:
                    "What is the process of heat transfer through direct contact?",
                  choices: [
                    "Conduction",
                    "Convection",
                    "Radiation",
                    "Evaporation",
                  ],
                  correctAnswer: "Conduction",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Criminology Reviewer",
      description:
        "A comprehensive reviewer for criminology students covering essential topics for board and entrance exams.",
      college: "COC",
      program: null,
      SY: '2024-2025',
      isActive : true,
      sections: [
        {
          name: "Criminal Law",
          subtopics: [
            {
              name: "General Principles",
              questions: [
                {
                  question:
                    "What is the principle that states no crime can exist without a law punishing it?",
                  choices: [
                    "Nullum crimen sine lege",
                    "Mens rea",
                    "Actus reus",
                    "Lex talionis",
                  ],
                  correctAnswer: "Nullum crimen sine lege",
                },
                {
                  question: "What is the mental state required for most crimes?",
                  choices: [
                    "Mens rea",
                    "Actus reus",
                    "Mala in se",
                    "Mala prohibita",
                  ],
                  correctAnswer: "Mens rea",
                },
              ],
            },
            {
              name: "Special Penal Laws",
              questions: [
                {
                  question: "RA 9165 is also known as?",
                  choices: [
                    "Comprehensive Dangerous Drugs Act of 2002",
                    "Anti-Drug Trafficking Act",
                    "Juvenile Justice Act",
                    "Anti-Money Laundering Act",
                  ],
                  correctAnswer: "Comprehensive Dangerous Drugs Act of 2002",
                },
                {
                  question:
                    "Which law covers Violence Against Women and Their Children?",
                  choices: ["RA 9262", "RA 9208", "RA 8551", "RA 10175"],
                  correctAnswer: "RA 9262",
                },
              ],
            },
          ],
        },
        {
          name: "Criminal Investigation",
          subtopics: [
            {
              name: "Investigative Techniques",
              questions: [
                {
                  question:
                    "What is the first step in conducting a criminal investigation?",
                  choices: [
                    "Secure the crime scene",
                    "Interview witnesses",
                    "Collect evidence",
                    "Identify suspects",
                  ],
                  correctAnswer: "Secure the crime scene",
                },
                {
                  question:
                    "Which document records the physical evidence collected from a crime scene?",
                  choices: [
                    "Chain of custody",
                    "Case summary",
                    "Incident report",
                    "Forensic log",
                  ],
                  correctAnswer: "Chain of custody",
                },
              ],
            },
            {
              name: "Forensic Science",
              questions: [
                {
                  question: "What does DNA stand for?",
                  choices: [
                    "Deoxyribonucleic Acid",
                    "Deoxyribosomal Acid",
                    "Deoxynucleic Acid",
                    "Dioxyribonucleic Acid",
                  ],
                  correctAnswer: "Deoxyribonucleic Acid",
                },
                {
                  question: "Which type of fingerprint pattern is most common?",
                  choices: ["Loop", "Arch", "Whorl", "Composite"],
                  correctAnswer: "Loop",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  
