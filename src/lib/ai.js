// Mock AI Service for Hackathon Demo
// Simulates a comprehensive Generative AI for adaptive quizzes.

// --- 1. DEEP KNOWLEDGE BASE (Topics & Concepts) ---
const KNOWLEDGE_BASE = {
    // Programming Languages
    'python': {
        concepts: ['Lists', 'Dictionaries', 'Tuples', 'Decorators', 'Generators', 'Lambda Functions', 'Pandas', 'NumPy', 'GIL', 'Indentation'],
        keywords: ['def', 'class', 'import', 'from', 'if', 'elif', 'else', 'try', 'except', 'finally', 'with', 'lambda', 'yield'],
        facts: [
            { q: "What is the output of print(type([]))?", a: "<class 'list'>", w: ["<class 'array'>", "<class 'tuple'>", "<class 'dict'>"] },
            { q: "Which method adds an element to the end of a list?", a: "append()", w: ["add()", "push()", "insert()"] },
            { q: "What is the purpose of 'self' in a class?", a: "Refers to the current instance", w: ["Refers to the class", "It is a keyword", "Global variable"] }
        ]
    },
    'javascript': {
        concepts: ['Closures', 'Promises', 'Async/Await', 'DOM', 'Event Loop', 'Hoisting', 'Prototypes', 'ES6', 'Arrow Functions'],
        keywords: ['function', 'var', 'let', 'const', 'await', 'async', 'return', 'import', 'export', 'class', 'this'],
        facts: [
            { q: "What is the result of '2' + 2?", a: "'22'", w: ["4", "NaN", "Error"] },
            { q: "Which method converts a JSON string to an object?", a: "JSON.parse()", w: ["JSON.stringify()", "JSON.toObject()", "JSON.convert()"] },
            { q: "What does '===' check?", a: "Value and Type", w: ["Value only", "Type only", "Reference"] }
        ]
    },
    'java': {
        concepts: ['JVM', 'Garbage Collection', 'Multithreading', 'Streams API', 'Inheritance', 'Polymorphism', 'Interfaces', 'Abstract Classes'],
        keywords: ['public', 'private', 'protected', 'static', 'final', 'void', 'class', 'interface', 'extends', 'implements'],
        facts: [
            { q: "What is the size of an int in Java?", a: "4 bytes", w: ["2 bytes", "8 bytes", "Depends on OS"] },
            { q: "Which collection allows unique elements only?", a: "Set", w: ["List", "Map", "Array"] },
            { q: "Entry point of a Java application?", a: "public static void main(String[] args)", w: ["void main()", "static main()", "public void main()"] }
        ]
    },
    'react': {
        concepts: ['Hooks', 'Virtual DOM', 'JSX', 'Components', 'Props', 'State', 'Context API', 'Redux', 'Lifecycle Methods'],
        keywords: ['useState', 'useEffect', 'useContext', 'render', 'return', 'props', 'className'],
        facts: [
            { q: "What prevents a component from re-rendering unnecessarily?", a: "React.memo", w: ["useMemo", "useEffect", "useState"] },
            { q: "Which hook replaces componentDidMount?", a: "useEffect", w: ["useLayoutEffect", "useState", "useReducer"] }
        ]
    },
    // Generic CS
    'cs': {
        concepts: ['Big O Notation', 'Data Structures', 'Algorithms', 'Binary Search', 'Sorting', 'Recursion', 'Hashing'],
        facts: [
            { q: "Time complexity of accessing an array element?", a: "O(1)", w: ["O(n)", "O(log n)", "O(n^2)"] },
            { q: "Which data structure uses LIFO?", a: "Stack", w: ["Queue", "Array", "Tree"] }
        ]
    }
};

// --- 1.5 CODE SNIPPETS FOR QUIZ ---
const CODE_SNIPPETS = {
    'python': [
        { code: "print(2 ** 3)", output: "8", options: ["6", "9", "Error"], explain: "** is the exponentiation operator." },
        { code: "x = [1, 2]; x.append(3); print(len(x))", output: "3", options: ["2", "4", "Error"], explain: "append() adds an element, increasing length by 1." },
        { code: "print('hello'.upper())", output: "HELLO", options: ["Hello", "hello", "Error"], explain: "upper() converts string to uppercase." },
        { code: "for i in range(3): print(i, end=' ')", output: "0 1 2", options: ["1 2 3", "0 1 2 3", "012"], explain: "range(3) generates 0, 1, 2." },
        { code: "print(bool([]))", output: "False", options: ["True", "None", "Error"], explain: "Empty lists evaluate to False." }
    ],
    'javascript': [
        { code: "console.log(typeof NaN);", output: "number", options: ["NaN", "undefined", "object"], explain: "NaN is technically a numeric data type." },
        { code: "console.log(1 + '1');", output: "11", options: ["2", "Error", "NaN"], explain: "Number 1 is coerced to string '1', then concatenated." },
        { code: "let a = [1, 2, 3]; console.log(a.length);", output: "3", options: ["2", "4", "undefined"], explain: "Array length property returns the count of elements." },
        { code: "console.log(2 == '2');", output: "true", options: ["false", "Error", "undefined"], explain: "== performs type coercion before comparison." }
    ],
    'java': [
        { code: "System.out.println(10 % 3);", output: "1", options: ["3", "0", "10"], explain: "% is the modulus operator (remainder)." },
        { code: "String s = \"Java\"; System.out.println(s.length());", output: "4", options: ["5", "3", "Error"], explain: "length() method returns string length." },
        { code: "int[] arr = {1, 2}; System.out.println(arr[0]);", output: "1", options: ["2", "0", "Error"], explain: "Arrays are 0-indexed." }
    ]
};

// --- 2. DYNAMIC TEMPLATES (Infinite Variations) ---
const TEMPLATES = [
    {
        // TYPE: Code Output
        id: 'code_output',
        weight: 0.4, // Higher weight for code questions
        generate: (topic) => {
            const snippets = CODE_SNIPPETS[topic] || CODE_SNIPPETS['python'];
            const snippet = snippets[Math.floor(Math.random() * snippets.length)];
            return {
                q: `What is the output of the following ${topic} code?\n\n${snippet.code}`,
                a: snippet.output,
                w: snippet.options,
                e: snippet.explain,
                uniqueId: `code_${topic}_${snippet.code.substring(0, 5)}` // For deduplication
            };
        }
    },
    {
        // TYPE: Syntax Identification
        id: 'syntax_ident',
        weight: 0.2,
        generate: (topic) => {
            const data = KNOWLEDGE_BASE[topic] || KNOWLEDGE_BASE['python']; // Fallback
            const keyword = data.keywords[Math.floor(Math.random() * data.keywords.length)];
            return {
                q: `In ${topic}, what is the primary use of the keyword '${keyword}'?`,
                a: `It is a reserved keyword in ${topic} syntax.`,
                w: ["It is a variable name.", "It is a function name.", "It is a comment marker."],
                e: `'${keyword}' is a fundamental part of the ${topic} language syntax.`
            };
        }
    },
    {
        // TYPE: Spot the Error (Simulated)
        id: 'spot_error',
        weight: 0.2,
        generate: (topic) => {
            const lang = topic === 'python' ? 'print "Hello"' : topic === 'java' ? 'System.out.println("Hello")' : 'console.log "Hello"';
            const correct = topic === 'python' ? 'print("Hello")' : topic === 'java' ? 'System.out.println("Hello");' : 'console.log("Hello")';
            return {
                q: `Identify the syntax error or correct usage in this ${topic} line: \n\n ${lang}`,
                a: `It might be missing parentheses or semicolons depending on version.`,
                w: ["It is perfectly correct.", "It is a logic error.", "It is a runtime error."],
                e: `Correct syntax usually requires: ${correct}`
            };
        }
    },
    {
        // TYPE: Concept Definition
        id: 'concept_def',
        weight: 0.3,
        generate: (topic) => {
            const data = KNOWLEDGE_BASE[topic] || KNOWLEDGE_BASE['cs'];
            const concept = data.concepts[Math.floor(Math.random() * data.concepts.length)];
            return {
                q: `Which of the following best describes '${concept}' in the context of ${topic}?`,
                a: `A core concept or feature in ${topic}.`,
                w: ["A type of hardware.", "A deprecated function.", "A third-party library."],
                e: `${concept} is a key part of the ${topic} ecosystem.`
            };
        }
    },
    {
        // TYPE: Fill in the Blank
        id: 'fill_blank',
        weight: 0.3,
        generate: (topic) => {
            if (topic === 'python') return { q: "complete: def my_func(): ___", a: "pass", w: ["stop", "end", "return null"], e: "'pass' is a null statement in Python." };
            if (topic === 'javascript') return { q: "complete: const x = ___ => x * 2;", a: "(x)", w: ["function", "def", "val"], e: "Arrow functions use => syntax." };
            return null;
        }
    }
];

// --- 3. GENERATOR FUNCTION ---
export const generateQuestion = async (courseId, difficulty, seenQuestionIds = []) => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 600));

    const topic = courseId.toLowerCase();
    const topicData = KNOWLEDGE_BASE[topic] || KNOWLEDGE_BASE['cs']; // Fallback to generic CS

    let questionData = null;
    let attempts = 0;

    // Try to generate a unique question
    while (attempts < 5) {
        const rand = Math.random();

        // Strategy 1: Static Fact (40% chance)
        if (rand < 0.4 && topicData.facts) {
            const fact = topicData.facts[Math.floor(Math.random() * topicData.facts.length)];
            questionData = {
                q: fact.q,
                options: [fact.a, ...fact.w].sort(() => Math.random() - 0.5),
                correct: fact.a,
                explanation: fact.e || `This is a standard fact about ${topic}.`,
                id: `static_${topic}_${fact.q.substring(0, 10).replace(/\s/g, '')}`
            };
        }
        // Strategy 2: Dynamic Template (60% chance)
        else {
            const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
            const res = template.generate(topic);
            if (res) {
                questionData = {
                    q: res.q,
                    options: [res.a, ...res.w].sort(() => Math.random() - 0.5),
                    correct: res.a,
                    explanation: res.e,
                    id: res.uniqueId || `dynamic_${template.id}_${Date.now()}`
                };
            }
        }

        // Check duplication
        if (questionData && !seenQuestionIds.includes(questionData.id)) {
            break;
        }
        attempts++;
    }

    // Fallback if unique generation failed
    if (!questionData) {
        questionData = {
            q: `What is a key benefit of learning ${courseId}?`,
            options: ["Career growth", "It is fun", "Problem solving", "All of the above"].sort(() => Math.random() - 0.5),
            correct: "All of the above",
            explanation: "Learning technology opens many doors.",
            id: `fallback_${Date.now()}`
        };
    }

    return {
        id: questionData.id,
        question: questionData.q,
        options: questionData.options,
        correct: questionData.correct,
        explanation: questionData.explanation,
        difficulty: difficulty,
        topic: courseId
    };
};

export const gradeQuiz = (answers) => {
    let score = 0;
    let correctCount = 0;
    answers.forEach(ans => {
        if (ans.isCorrect) {
            score += (ans.difficulty === 'Hard' ? 20 : ans.difficulty === 'Medium' ? 15 : 10);
            correctCount++;
        }
    });
    return {
        score,
        totalQuestions: answers.length,
        correctCount,
        percentage: answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0
    };
};
