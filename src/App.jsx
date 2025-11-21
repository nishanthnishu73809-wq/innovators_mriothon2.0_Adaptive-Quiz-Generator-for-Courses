import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';

function App() {
  const [user, setUser] = useState(null); // { name, email, phone, stats: { score, time } }
  const [view, setView] = useState('login'); // login, dashboard, courses, quiz, results
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = (userData) => {
    // Mock user data combined with login input
    setUser({
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      phone: '',
      stats: {
        totalScore: 1250,
        totalTime: 4500, // seconds
        quizzesTaken: 12
      },
      quizHistory: [
        { id: 1, courseTitle: 'Python', difficulty: 'Easy', score: 80, totalQuestions: 10, date: new Date(Date.now() - 86400000).toISOString() },
        { id: 2, courseTitle: 'JavaScript', difficulty: 'Medium', score: 60, totalQuestions: 10, date: new Date(Date.now() - 172800000).toISOString() }
      ]
    });
    setView('dashboard');
  };

  const handleStartQuiz = (course, difficulty) => {
    setSelectedCourse({ ...course, difficulty });
    setView('quiz');
  };

  const handleQuizComplete = (answers, timeTaken) => {
    setQuizResults({ answers, timeTaken, course: selectedCourse });

    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = correctCount * 10; // Simple scoring

    // Update user stats
    setUser(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        totalScore: prev.stats.totalScore + score,
        totalTime: prev.stats.totalTime + timeTaken,
        quizzesTaken: prev.stats.quizzesTaken + 1
      },
      quizHistory: [
        {
          id: Date.now(),
          courseTitle: selectedCourse.title,
          difficulty: selectedCourse.difficulty,
          score: (correctCount / answers.length) * 100, // Percentage
          totalQuestions: answers.length,
          date: new Date().toISOString()
        },
        ...(prev.quizHistory || [])
      ]
    }));

    setView('results');
  };

  const handleRetake = () => {
    setView('dashboard');
    setSelectedCourse(null);
    setQuizResults(null);
  };

  const handleSignOut = () => {
    setUser(null);
    setView('login');
    setShowProfile(false);
  };

  return (
    <div className="app-container">
      {user && (
        <Navbar
          user={user}
          currentView={view}
          onNavigate={setView}
          onOpenProfile={() => setShowProfile(true)}
        />
      )}

      <AnimatePresence mode="wait">
        {view === 'login' && (
          <Login key="login" onLogin={handleLogin} />
        )}

        {view === 'dashboard' && (
          <Dashboard
            key="dashboard"
            user={user}
            onNavigate={setView}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {view === 'courses' && (
          <CourseList
            key="courses"
            onStartQuiz={handleStartQuiz}
            onBack={() => setView('dashboard')}
          />
        )}

        {view === 'quiz' && selectedCourse && (
          <Quiz
            key="quiz"
            course={selectedCourse}
            difficulty={selectedCourse.difficulty}
            onComplete={handleQuizComplete}
          />
        )}

        {view === 'results' && quizResults && (
          <Results
            key="results"
            results={quizResults}
            onRetake={handleRetake}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProfile && user && (
          <UserProfile
            user={user}
            onClose={() => setShowProfile(false)}
            onUpdateUser={setUser}
            onSignOut={handleSignOut}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
