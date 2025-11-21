import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ArrowRight, Save } from 'lucide-react';
import { generateQuestion } from '../lib/ai';

const Quiz = ({ course, difficulty, onComplete }) => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState(null); // { isCorrect, explanation }
    const [answers, setAnswers] = useState([]);
    const [timer, setTimer] = useState(0);

    // Timer
    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    // Initial Question Load
    useEffect(() => {
        loadNextQuestion();
    }, []);

    const loadNextQuestion = async () => {
        setLoading(true);

        // Adaptive Logic:
        // If correct, increase difficulty (Easy -> Medium -> Hard)
        // If wrong, decrease difficulty (Hard -> Medium -> Easy)
        let nextDiff = difficulty;
        if (answers.length > 0) {
            const lastAns = answers[answers.length - 1];
            if (lastAns.isCorrect) {
                if (lastAns.difficulty === 'Easy') nextDiff = 'Medium';
                else if (lastAns.difficulty === 'Medium') nextDiff = 'Hard';
            } else {
                if (lastAns.difficulty === 'Hard') nextDiff = 'Medium';
                else if (lastAns.difficulty === 'Medium') nextDiff = 'Easy';
            }
        }

        // Collect IDs of questions already generated to prevent duplicates
        const seenIds = questions.map(q => q.id);
        const newQ = await generateQuestion(course.id, nextDiff, seenIds);

        setQuestions(prev => [...prev, newQ]);
        setLoading(false);
    };

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
    };

    const handleSubmitAnswer = () => {
        if (!selectedOption) return;

        const currentQ = questions[currentQIndex];
        const isCorrect = selectedOption === currentQ.correct;

        setFeedback({
            isCorrect,
            explanation: currentQ.explanation
        });
        setIsAnswered(true);

        setAnswers(prev => [...prev, {
            questionId: currentQ.id,
            question: currentQ.question,
            selected: selectedOption,
            correct: currentQ.correct,
            isCorrect,
            difficulty: currentQ.difficulty,
            timeSpent: timer // simplified, ideally per question
        }]);
    };

    const handleNext = () => {
        setIsAnswered(false);
        setSelectedOption(null);
        setFeedback(null);

        if (currentQIndex < questions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
        } else {
            // Generate new question if we want endless, or just load next
            // For this demo, let's say we want 10 questions total
            if (questions.length < 10) {
                setCurrentQIndex(prev => prev + 1);
                loadNextQuestion();
            } else {
                // End of quiz
                onComplete(answers, timer);
            }
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading && questions.length === 0) {
        return (
            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <div className="loader" style={{ width: '50px', height: '50px', border: '5px solid var(--glass-border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>AI is generating your personalized quiz...</p>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' }}>
                        {course.title} • {currentQ?.difficulty}
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)' }}>
                    <Clock size={20} />
                    <span style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>{formatTime(timer)}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginBottom: '2rem' }}>
                <div style={{ width: `${((currentQIndex + 1) / 10) * 100}%`, height: '100%', background: 'var(--primary-gradient)', borderRadius: '3px', transition: 'width 0.3s' }}></div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                {currentQ && (
                    <motion.div
                        key={currentQ.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="glass-panel"
                        style={{ padding: '2rem' }}
                    >
                        <h2 style={{ marginBottom: '2rem', lineHeight: '1.4' }}>{currentQ.question}</h2>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {currentQ.options.map((opt, idx) => {
                                const isSelected = selectedOption === opt;
                                const isCorrect = feedback && opt === currentQ.correct;
                                const isWrong = feedback && isSelected && !feedback.isCorrect;

                                let borderColor = 'var(--glass-border)';
                                let bg = 'rgba(255,255,255,0.05)';

                                if (feedback) {
                                    if (opt === currentQ.correct) {
                                        borderColor = 'var(--success)';
                                        bg = 'rgba(0, 200, 81, 0.1)';
                                    } else if (isSelected && !feedback.isCorrect) {
                                        borderColor = 'var(--error)';
                                        bg = 'rgba(255, 75, 75, 0.1)';
                                    }
                                } else if (isSelected) {
                                    borderColor = 'var(--primary)';
                                    bg = 'rgba(102, 126, 234, 0.1)';
                                }

                                return (
                                    <motion.div
                                        key={idx}
                                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                                        onClick={() => handleOptionSelect(opt)}
                                        style={{
                                            padding: '1rem 1.5rem',
                                            border: `2px solid ${borderColor}`,
                                            background: bg,
                                            borderRadius: '12px',
                                            cursor: isAnswered ? 'default' : 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>{String.fromCharCode(65 + idx)}.</span>
                                            <span>{opt}</span>
                                        </div>
                                        {feedback && opt === currentQ.correct && <CheckCircle color="var(--success)" size={20} />}
                                        {feedback && isSelected && !feedback.isCorrect && <XCircle color="var(--error)" size={20} />}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Feedback Section */}
                        <AnimatePresence>
                            {feedback && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={{ marginTop: '2rem', padding: '1.5rem', background: feedback.isCorrect ? 'rgba(0,200,81,0.1)' : 'rgba(255,75,75,0.1)', borderRadius: '12px', borderLeft: `4px solid ${feedback.isCorrect ? 'var(--success)' : 'var(--error)'}` }}
                                >
                                    <h4 style={{ color: feedback.isCorrect ? 'var(--success)' : 'var(--error)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                                        {feedback.isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect'}
                                    </h4>

                                    {!feedback.isCorrect && (
                                        <div style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The correct answer is: </span>
                                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{currentQ.correct}</span>
                                        </div>
                                    )}

                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.5' }}>
                                        <strong>Explanation:</strong> {feedback.explanation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            {!isAnswered ? (
                                <button
                                    className="btn"
                                    onClick={handleSubmitAnswer}
                                    disabled={!selectedOption}
                                    style={{ opacity: !selectedOption ? 0.5 : 1, cursor: !selectedOption ? 'not-allowed' : 'pointer' }}
                                >
                                    Submit Answer
                                </button>
                            ) : (
                                <button className="btn" onClick={handleNext} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {currentQIndex < 9 ? 'Next Question' : 'Submit All'} <ArrowRight size={18} />
                                </button>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Quiz;
