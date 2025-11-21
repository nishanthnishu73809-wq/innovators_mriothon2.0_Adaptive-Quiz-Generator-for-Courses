import React from 'react';
import { ArrowLeft, Menu, User, LogOut, HelpCircle, Settings } from 'lucide-react';

const Navbar = ({ user, currentView, onNavigate, onOpenProfile }) => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {currentView !== 'dashboard' && (
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="icon-btn"
                        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                    >
                        <ArrowLeft size={24} />
                    </button>
                )}
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    AQG
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                    onClick={onOpenProfile}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--glass-border)',
                        padding: '0.5rem 1rem',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} />
                    </div>
                    <span style={{ fontWeight: '500' }}>{user.name}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
