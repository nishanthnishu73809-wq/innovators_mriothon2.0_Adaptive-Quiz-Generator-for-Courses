import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code, Database, Cloud, Shield, Smartphone, BookOpen, Palette, Briefcase, Cpu, Globe, Server, Zap, Coffee, ArrowLeft } from 'lucide-react';

const ALL_COURSES = [
    // Languages
    { id: 'python', category: 'languages', title: 'Python', icon: <Code />, color: '#FFD43B' },
    { id: 'java', category: 'languages', title: 'Java', icon: <Coffee />, color: '#E84393' },
    { id: 'cpp', category: 'languages', title: 'C++', icon: <Code />, color: '#0984E3' },
    { id: 'javascript', category: 'languages', title: 'JavaScript', icon: <Code />, color: '#F7DF1E' },
    { id: 'csharp', category: 'languages', title: 'C#', icon: <Code />, color: '#9B59B6' },
    { id: 'go', category: 'languages', title: 'Go', icon: <Code />, color: '#00ADD8' },
    { id: 'rust', category: 'languages', title: 'Rust', icon: <Code />, color: '#DEA584' },
    { id: 'swift', category: 'languages', title: 'Swift', icon: <Code />, color: '#F05138' },

    // Web
    { id: 'react', category: 'web', title: 'React JS', icon: <Globe />, color: '#61DAFB' },
    { id: 'angular', category: 'web', title: 'Angular', icon: <Globe />, color: '#DD0031' },
    { id: 'vue', category: 'web', title: 'Vue.js', icon: <Globe />, color: '#42B883' },
    { id: 'html', category: 'web', title: 'HTML5', icon: <Globe />, color: '#E34F26' },
    { id: 'css', category: 'web', title: 'CSS3', icon: <Globe />, color: '#1572B6' },
    { id: 'node', category: 'web', title: 'Node.js', icon: <Server />, color: '#339933' },

    // Data & AI
    { id: 'ml', category: 'data', title: 'Machine Learning', icon: <Cpu />, color: '#FF7675' },
    { id: 'dl', category: 'data', title: 'Deep Learning', icon: <Cpu />, color: '#6C5CE7' },
    { id: 'datascience', category: 'data', title: 'Data Science', icon: <Database />, color: '#00B894' },
    { id: 'sql', category: 'data', title: 'SQL', icon: <Database />, color: '#FDCB6E' },

    // Cloud & DevOps
    { id: 'aws', category: 'cloud', title: 'AWS', icon: <Cloud />, color: '#FF9900' },
    { id: 'azure', category: 'cloud', title: 'Azure', icon: <Cloud />, color: '#0089D6' },
    { id: 'docker', category: 'cloud', title: 'Docker', icon: <Server />, color: '#2496ED' },
    { id: 'kubernetes', category: 'cloud', title: 'Kubernetes', icon: <Server />, color: '#326CE5' },

    // Cybersecurity
    { id: 'networksec', category: 'cybersecurity', title: 'Network Security', icon: <Shield />, color: '#D63031' },
    { id: 'ethicalhacking', category: 'cybersecurity', title: 'Ethical Hacking', icon: <Shield />, color: '#2D3436' },

    // Mobile
    { id: 'flutter', category: 'mobile', title: 'Flutter', icon: <Smartphone />, color: '#02569B' },
    { id: 'reactnative', category: 'mobile', title: 'React Native', icon: <Smartphone />, color: '#61DAFB' },
    { id: 'ios', category: 'mobile', title: 'iOS Dev', icon: <Smartphone />, color: '#000000' },
    { id: 'android', category: 'mobile', title: 'Android Dev', icon: <Smartphone />, color: '#3DDC84' },

    // School
    { id: 'math', category: 'school', title: 'Mathematics', icon: <BookOpen />, color: '#6C5CE7' },
    { id: 'physics', category: 'school', title: 'Physics', icon: <BookOpen />, color: '#0984E3' },
    { id: 'chemistry', category: 'school', title: 'Chemistry', icon: <BookOpen />, color: '#E17055' },
    { id: 'biology', category: 'school', title: 'Biology', icon: <BookOpen />, color: '#00B894' },

    // Creative
    { id: 'design', category: 'creative', title: 'UI/UX Design', icon: <Palette />, color: '#FD79A8' },
    { id: 'video', category: 'creative', title: 'Video Editing', icon: <Palette />, color: '#A29BFE' },

    // Business
    { id: 'finance', category: 'business', title: 'Finance', icon: <Briefcase />, color: '#FDCB6E' },
    { id: 'marketing', category: 'business', title: 'Marketing', icon: <Briefcase />, color: '#FF7675' },
];

const CATEGORIES = [
    { id: 'languages', label: 'Languages' },
    { id: 'web', label: 'Web Dev' },
    { id: 'data', label: 'Data & AI' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'cybersecurity', label: 'Cybersecurity' },
    { id: 'mobile', label: 'Mobile App' },
    { id: 'school', label: 'School Curriculum' },
    { id: 'creative', label: 'Creative & Arts' },
    { id: 'business', label: 'Business & Finance' },
];

const CourseList = ({ onStartQuiz, onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('languages');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showExample, setShowExample] = useState(false);

    const getExampleCode = (courseId) => {
        const examples = {
            python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
            java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`,
            javascript: `const greet = (name) => {\n    console.log(\`Hello, \${name}!\`);\n};\n\ngreet("World");`,
            rust: `fn main() {\n    println!("Hello, world!");\n}`,
            react: `function App() {\n    return <h1>Hello World</h1>;\n}`,
            sql: `SELECT * FROM users\nWHERE status = 'active';`,
            default: `// Example code for ${selectedCourse?.title}\nprint("Hello World");`
        };
        return examples[courseId] || examples['default'];
    };

    const filteredCourses = ALL_COURSES.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const displayCourses = searchQuery
        ? ALL_COURSES.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : filteredCourses;

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };

    const handleUniversalSearch = () => {
        const genericCourse = {
            id: searchQuery.toLowerCase().replace(/\s+/g, '_'),
            title: searchQuery,
            icon: <Zap />,
            color: '#a29bfe',
            isUniversal: true
        };
        setSelectedCourse(genericCourse);
    };

    return (
        <div className="container">
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={onBack} className="btn" style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--glass-border)' }}>
                    <ArrowLeft size={20} />
                </button>
                <h2>Explore Courses</h2>
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Search for any topic (e.g. Rust, Cooking, Astrophysics)..."
                    className="input-field"
                    style={{ paddingLeft: '3rem' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Categories */}
            {!searchQuery && (
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                border: '1px solid var(--glass-border)',
                                background: selectedCategory === cat.id ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Course Grid */}
            <div className="grid">
                <AnimatePresence>
                    {displayCourses.map(course => (
                        <motion.div
                            key={course.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card"
                            onClick={() => handleCourseClick(course)}
                            whileHover={{ y: -5 }}
                        >
                            <div style={{
                                width: '50px', height: '50px',
                                borderRadius: '12px',
                                background: course.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1rem',
                                color: 'white'
                            }}>
                                {course.icon}
                            </div>
                            <h3>{course.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                Master {course.title} with adaptive quizzes.
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Universal Search Fallback */}
                {searchQuery && displayCourses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="card"
                        onClick={handleUniversalSearch}
                        style={{ border: '2px dashed var(--primary)', background: 'rgba(102, 126, 234, 0.1)' }}
                    >
                        <div style={{ marginBottom: '1rem', color: 'var(--primary)' }}><Zap size={32} /></div>
                        <h3>Generate Quiz for "{searchQuery}"</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            AI will generate a custom quiz for this topic instantly.
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Difficulty Selection Modal */}
            <AnimatePresence>
                {selectedCourse && !showExample && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            zIndex: 1000
                        }}
                        onClick={() => setSelectedCourse(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel"
                            style={{ width: '400px', padding: '2rem' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 style={{ marginBottom: '0.5rem' }}>{selectedCourse.title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Select your starting difficulty</p>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {['Easy', 'Medium', 'Hard'].map(diff => (
                                    <button
                                        key={diff}
                                        className="btn"
                                        onClick={() => onStartQuiz(selectedCourse, diff)}
                                        style={{
                                            background: diff === 'Easy' ? 'rgba(0, 184, 148, 0.2)' : diff === 'Medium' ? 'rgba(253, 203, 110, 0.2)' : 'rgba(214, 48, 49, 0.2)',
                                            border: `1px solid ${diff === 'Easy' ? '#00b894' : diff === 'Medium' ? '#fdcb6e' : '#d63031'}`
                                        }}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                <button
                                    className="btn"
                                    style={{ background: 'rgba(255,255,255,0.1)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                    onClick={() => setShowExample(true)}
                                >
                                    <Code size={18} /> View Example Programs
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Example Code Modal */}
            <AnimatePresence>
                {showExample && selectedCourse && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            zIndex: 1100
                        }}
                        onClick={() => setShowExample(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-panel"
                            style={{ width: '500px', padding: '2rem', background: '#1e1e2e' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Code size={20} color="var(--primary)" />
                                    {selectedCourse.title} Example
                                </h3>
                                <button onClick={() => setShowExample(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Close</button>
                            </div>

                            <div style={{
                                background: '#0f0f1a',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                color: '#a29bfe',
                                overflowX: 'auto',
                                border: '1px solid var(--glass-border)'
                            }}>
                                <pre style={{ margin: 0 }}>{getExampleCode(selectedCourse.id)}</pre>
                            </div>

                            <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                This is a basic syntax example. The quiz will test your understanding of these concepts and more.
                            </p>

                            <button
                                className="btn"
                                onClick={() => setShowExample(false)}
                                style={{ marginTop: '1.5rem', width: '100%' }}
                            >
                                Back to Difficulty Selection
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CourseList;
