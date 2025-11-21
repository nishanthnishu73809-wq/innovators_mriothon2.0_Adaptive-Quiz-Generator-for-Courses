import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, Mail, Key, MessageSquare, Check } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [view, setView] = useState('login'); // login, signup, forgot_init, forgot_otp, forgot_new_pass
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Forgot Password State
    const [resetContact, setResetContact] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [sentOtp, setSentOtp] = useState(null);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin({ name: email.split('@')[0], email });
        }
    };

    const sendOtp = (e) => {
        e.preventDefault();
        if (!resetContact) return;
        // Mock OTP generation
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        setSentOtp(code);
        alert(`[DEMO] Your OTP code is: ${code}`);
        setView('forgot_otp');
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        if (otp === sentOtp) {
            setView('forgot_new_pass');
        } else {
            alert('Incorrect OTP. Please try again.');
        }
    };

    const resetPass = (e) => {
        e.preventDefault();
        alert('Password successfully reset! Please sign in with your new password.');
        setView('login');
        // Reset states
        setResetContact('');
        setOtp('');
        setNewPassword('');
        setPassword('');
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel"
                style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="logo">AQG</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {view === 'login' ? 'Welcome back, learner!' :
                            view === 'signup' ? 'Start your adaptive journey.' :
                                'Reset your password'}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {/* Login / Signup Form */}
                    {(view === 'login' || view === 'signup') && (
                        <motion.form
                            key="auth-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleLoginSubmit}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <User size={20} color="var(--text-muted)" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Lock size={20} color="var(--text-muted)" />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                                        required
                                    />
                                </div>
                            </div>

                            {view === 'login' && (
                                <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setView('forgot_init')}
                                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.9rem' }}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button type="submit" className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: view === 'signup' ? '1.5rem' : '0' }}>
                                {view === 'login' ? 'Sign In' : 'Create Account'}
                                <ArrowRight size={18} />
                            </button>
                        </motion.form>
                    )}

                    {/* Forgot Password: Step 1 - Email/Phone */}
                    {view === 'forgot_init' && (
                        <motion.form
                            key="forgot-init"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={sendOtp}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Enter your Email or Phone</label>
                                <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Mail size={20} color="var(--text-muted)" />
                                    <input
                                        type="text"
                                        placeholder="student@example.com"
                                        value={resetContact}
                                        onChange={(e) => setResetContact(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Send OTP <MessageSquare size={18} />
                            </button>
                        </motion.form>
                    )}

                    {/* Forgot Password: Step 2 - OTP */}
                    {view === 'forgot_otp' && (
                        <motion.form
                            key="forgot-otp"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={verifyOtp}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Enter OTP sent to {resetContact}</label>
                                <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Key size={20} color="var(--text-muted)" />
                                    <input
                                        type="text"
                                        placeholder="XXXX"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', letterSpacing: '5px', textAlign: 'center', fontSize: '1.2rem' }}
                                        maxLength={4}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Verify OTP <Check size={18} />
                            </button>
                        </motion.form>
                    )}

                    {/* Forgot Password: Step 3 - New Password */}
                    {view === 'forgot_new_pass' && (
                        <motion.form
                            key="forgot-new"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={resetPass}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Enter New Password</label>
                                <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Lock size={20} color="var(--text-muted)" />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                Reset Password <Check size={18} />
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Footer Links */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    {(view === 'login' || view === 'signup') ? (
                        <button
                            onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            {view === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setView('login')}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Back to Login
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
