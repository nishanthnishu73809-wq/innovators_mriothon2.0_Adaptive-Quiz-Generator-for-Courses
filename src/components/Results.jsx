import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Share2, Home, Download, Image as ImageIcon } from 'lucide-react';
import { gradeQuiz } from '../lib/ai';

const Results = ({ results, onRetake }) => {
    const { answers, timeTaken: totalTime } = results;
    const onHome = onRetake;
    const result = gradeQuiz(answers);
    const [showReview, setShowReview] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeBackground = () => {
        // Stub for background removal
        alert("Background removal processing... (This requires a backend API in production)");
    };

    return (
        <div className="container" style={{ maxWidth: '1000px', paddingBottom: '4rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Quiz Completed!
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Here is how you performed.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {/* Score Card */}
                <motion.div
                    className="glass-panel"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '6px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)' }}>
                        {result.percentage}%
                    </div>
                    <h3>Total Score</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{result.correctCount} Correct</p>
                </motion.div>

                {/* Questions Attended Card */}
                <motion.div
                    className="glass-panel"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <CheckCircle size={50} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h3>Questions Attended</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{result.totalQuestions}</p>
                </motion.div>

                {/* Time Card */}
                <motion.div
                    className="glass-panel"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Clock size={50} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                    <h3>Time Spent</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {Math.floor(totalTime / 60)}m {totalTime % 60}s
                    </p>
                </motion.div>
            </div>

            {/* Image Upload Section */}
            <motion.div
                className="glass-panel"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ padding: '2rem', marginBottom: '3rem' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3><ImageIcon style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Upload & Process Image</h3>
                    <button className="btn btn-secondary" onClick={removeBackground} disabled={!uploadedImage}>Remove Background</button>
                </div>

                <div style={{ border: '2px dashed var(--glass-border)', borderRadius: '12px', padding: '2rem', textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {uploadedImage ? (
                        <div style={{ position: 'relative', maxWidth: '100%' }}>
                            <img src={uploadedImage} alt="Uploaded" style={{ maxHeight: '300px', borderRadius: '8px' }} />
                            <button
                                onClick={() => setUploadedImage(null)}
                                style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--error)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                            >
                                X
                            </button>
                        </div>
                    ) : (
                        <>
                            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Drag & drop or click to upload an image related to your course.</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                id="img-upload"
                            />
                            <label htmlFor="img-upload" className="btn">Select Image</label>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Review Section */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Detailed Review</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {answers.map((ans, idx) => (
                        <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${ans.isCorrect ? 'var(--success)' : 'var(--error)'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Question {idx + 1}</span>
                                <span style={{
                                    background: ans.isCorrect ? 'rgba(0,200,81,0.2)' : 'rgba(255,75,75,0.2)',
                                    color: ans.isCorrect ? 'var(--success)' : 'var(--error)',
                                    padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.8rem'
                                }}>
                                    {ans.difficulty}
                                </span>
                            </div>

                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{ans.question}</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Answer</p>
                                    <p style={{ color: ans.isCorrect ? 'var(--success)' : 'var(--error)' }}>{ans.selected}</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Correct Answer</p>
                                    <p style={{ color: 'var(--success)' }}>{ans.correct}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn" onClick={onHome} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Home size={18} /> Back to Dashboard
                </button>
                <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Share2 size={18} /> Share Result
                </button>
            </div>
        </div>
    );
};

export default Results;
