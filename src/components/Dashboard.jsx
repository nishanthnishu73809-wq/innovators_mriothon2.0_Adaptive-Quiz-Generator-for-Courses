import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Activity, Clock, BookOpen, ArrowRight } from 'lucide-react';

const Dashboard = ({ user, onNavigate }) => {
    return (
        <div className="container">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    Welcome back, <span style={{ color: 'var(--primary)' }}>{user.name}</span>!
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Here is your learning progress.</p>
            </div>

            {/* User Stats Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                    <div style={{ padding: '10px', background: 'rgba(255, 212, 59, 0.2)', borderRadius: '12px', color: '#FFD43B' }}>
                        <Trophy size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.stats.totalScore}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Score</p>
                    </div>
                </div>
                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                    <div style={{ padding: '10px', background: 'rgba(9, 132, 227, 0.2)', borderRadius: '12px', color: '#0984E3' }}>
                        <Activity size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.stats.quizzesTaken}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Quizzes Taken</p>
                    </div>
                </div>
                <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem' }}>
                    <div style={{ padding: '10px', background: 'rgba(0, 184, 148, 0.2)', borderRadius: '12px', color: '#00B894' }}>
                        <Clock size={24} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{Math.round(user.stats.totalTime / 60)}m</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Time Spent</p>
                    </div>
                </div>
            </div>

            {/* Main Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-panel"
                    style={{ padding: '2rem', cursor: 'pointer', border: '1px solid var(--primary)', background: 'rgba(102, 126, 234, 0.1)' }}
                    onClick={() => onNavigate('courses')}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ padding: '12px', background: 'var(--primary)', borderRadius: '12px', color: 'white' }}>
                            <BookOpen size={24} />
                        </div>
                        <ArrowRight size={24} color="var(--primary)" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Explore Courses</h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Browse our catalog of programming languages, web development, and more. Start your adaptive quiz journey now.
                    </p>
                </motion.div>

                {/* Recent Activity */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}>
                            <Activity size={24} />
                        </div>
                        <h2>Recent Activity</h2>
                    </div>

                    {user.quizHistory && user.quizHistory.length > 0 ? (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {user.quizHistory.map((quiz) => (
                                <div key={quiz.id} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px',
                                    borderLeft: `4px solid ${quiz.score >= 70 ? 'var(--success)' : quiz.score >= 40 ? 'var(--warning)' : 'var(--error)'}`
                                }}>
                                    <div>
                                        <h4 style={{ marginBottom: '0.2rem' }}>{quiz.courseTitle}</h4>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '10px' }}>{quiz.difficulty}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(quiz.date).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: quiz.score >= 70 ? 'var(--success)' : quiz.score >= 40 ? 'var(--warning)' : 'var(--error)' }}>
                                            {Math.round(quiz.score)}%
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Score</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>No quizzes taken yet. Start learning!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
