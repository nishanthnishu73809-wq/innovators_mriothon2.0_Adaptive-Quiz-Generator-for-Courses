import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, LogOut, HelpCircle, X, Save } from 'lucide-react';

const UserProfile = ({ user, onClose, onUpdateUser, onSignOut }) => {
    const [phone, setPhone] = useState(user.phone || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onUpdateUser({ ...user, phone });
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 2000
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel"
                style={{ width: '400px', padding: '2rem', position: 'relative', background: '#1a1a2e' }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-gradient)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={40} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem' }}>{user.name}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Student Account</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Email (Read Only) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                        <Mail size={20} color="var(--primary)" />
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</p>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    {/* Phone (Editable) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                        <Phone size={20} color="var(--secondary)" />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</p>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input-field"
                                    style={{ padding: '0.3rem', marginTop: '0.2rem', width: '100%' }}
                                    autoFocus
                                />
                            ) : (
                                <p>{user.phone || 'Not set'}</p>
                            )}
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer' }}
                        >
                            {isEditing ? <Save size={18} /> : 'Edit'}
                        </button>
                    </div>

                    {/* Actions */}
                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <HelpCircle size={18} /> Help & Support
                        </button>
                        <button
                            onClick={onSignOut}
                            className="btn"
                            style={{ background: 'rgba(255, 75, 75, 0.2)', color: '#ff4b4b', border: '1px solid rgba(255, 75, 75, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UserProfile;
